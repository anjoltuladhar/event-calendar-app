import React, { Component } from 'react'
import {
    Container,
    Paper,
    IconButton,
    InputBase,
    ButtonGroup,
    Button,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox
} from '@material-ui/core'
import { Search, Edit, ArrowBackIos, ArrowForwardIos, Add, FilterList } from '@material-ui/icons'
import axios from 'axios'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'inline-flex',
        alignItems: 'center',
        width: 400,
      },
      input: {
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      outerBtn: {
        padding: "5px 10px",
        background: "#fff",
        marginLeft: 15,
        fontWeight: 600,
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        '&:hover': {
            color: "#333"
        }
      },
      Tablelabel: {
        background: "#fff",
        padding: "15px 35px",
        fontWeight: 500,
        borderRadius: "10px 10px 0 0",
        display: "flex",
        justifyContent: "space-between"
      },
      cellEditIcon: {
          border: "1px solid #333",
          '&:hover': {
              borderColor: "#888"
          }
      },
      cellRows: {
          background: "#fff",
          '&:hover': {
              background: "transparent",
          }
      },
      arrows: {
          borderRadius: 0,
          background: "#efefef",
          marginLeft: 5,
          '& svg': {
              fontSize: 15,
              fontWeight: 700
          }
      },
      topHeader: {
        display: "flex",
        justifyContent: "space-between",
        color: "#000",
        
      },
      topButton: {
        margin: "10px 0",
        color: '#fff',
        border: "none",
        '& button': {
            padding: 0,
        }
      }
})

class ClientListing extends Component{

    state = {
        clientList: [],
        count: 0,
        displayList: [],
        searchedList: [],
        pageNumber: 1,
        selectedItems: [],
        selectedSize: 0,
        searchValue: '',
    }

    constructor(props){
        super(props)
        this.loadClients()
    }

    loadClients = () => {
        axios.get('http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/getallclients/tenant/reesby')
        .then((response) => {
        const clients = response.data
        this.setState({clientList: clients, searchedList: clients, count: clients.length})
        this.loadPageData();
        });
    }

    loadPageData = () => {
        const { searchedList } = this.state
        const newList = []
        if(searchedList.length < 10){
            for (const index in searchedList) {
                newList[index] = searchedList[index]
            }
        }
        else{
            for (let index = 0; index < 10; index++) {
                if(searchedList[index] !== null){
                    newList[index] = searchedList[index];
                }
            }
        }
        this.setState({displayList: newList})
    }

    search = type => {
        const { searchValue, clientList } = this.state
        let sData = searchValue
        if(type === "clear"){
            sData = ""
        }
        const searchList = clientList.filter((client) => 
            ((client.clientName.toLowerCase().indexOf(sData.toLowerCase())) !== -1)
        )
        let newList = []
        for (let index = 0; index < 10; index++) {
            if(searchList[index]){
                newList[index] = searchList[index];
            }
        }
        this.setState({searchedList: searchList, displayList: newList, count: searchList.length})
    }

    clear = e => {
        e.preventDefault();
        var inputField = document.getElementById('search-key')
        inputField.value = ""
        this.search("clear")
        this.setState({searchValue: ''})
    }

    onSelectAllClick = e => {
        const { displayList, selectedItems } = this.state
        if(e.target.checked){
            for (const index in displayList) {
                selectedItems[index] = displayList[index].clientId
            }
            this.setState({selectedItems: selectedItems, selectedSize: displayList.length})
        }
        else{
            this.setState({selectedItems: [], selectedSize: 0})
        }
    }

    selectbox = e => {
        const { selectedItems, selectedSize } = this.state
        if(e.target.checked){
            selectedItems[selectedSize] = e.target.value
            this.setState({selectedItems: selectedItems, selectedSize: (selectedSize + 1)})
        }
        else{
            const removeIndex = this.removeItem(e.target.value)
            console.log(removeIndex)
            this.rearrangeIndex(removeIndex)
        }
    }

    rearrangeIndex = index => {
        const { selectedItems, selectedSize } = this.state
        selectedItems[index] = null
        var filtered = selectedItems.filter(function (item) {
            return item != null;
          });
        this.setState({selectedItems: filtered, selectedSize: (selectedSize - 1)})
    }

    removeItem = id => {
        const { selectedItems } = this.state;
        for (const index in selectedItems) {
            if(selectedItems[index] === id){
                // console.log(index)
                return index
            }
        }
        return -1
    }

    isSelected = id => {
        const { selectedItems } = this.state
        for (const index in selectedItems) {
            if(selectedItems[index] === id){
                return true;
            }
        }
        return false;
    }


    nextPage = e => {
        e.preventDefault();
        const { searchedList, pageNumber, count } = this.state
        const totalPages = Math.ceil(count/10);
        if(pageNumber < totalPages){
            const newList = []
            for (let index = (pageNumber*10); index < ((pageNumber+1)*10); index++) {
                if(searchedList[index]){
                    newList[index] = searchedList[index];
                }
            }
            this.setState({pageNumber: (pageNumber + 1), displayList: newList})
        }
    }

    prevPage = e => {
        e.preventDefault();
        const { searchedList, pageNumber, count } = this.state
        const totalPages = Math.ceil(count/10);
        if(pageNumber < totalPages){
            const newList = []
            for (let index = ((pageNumber-2)*10); index < ((pageNumber - 1)*10); index++) {
                if(searchedList[index]){
                    newList[index] = searchedList[index];
                }
            }
            this.setState({pageNumber: (pageNumber - 1), displayList: newList})
        }
    }

    handleValueChange = e => {
        if(e.target.value.length === 0){
            this.search()
            this.setState({searchValue: ''})
        }
        this.setState({searchValue: e.target.value})
    }

    render(){
        const { classes } = this.props;
        const { count, displayList, pageNumber } = this.state;
        const totalPages = Math.ceil(count/10);
        const prevDisabled = (pageNumber === 1)?true:false
        const nextDisabled = (pageNumber === totalPages)?true:false

        return (
            <Container maxWidth="lg" style={ { marginTop: 80, background: "#efefef", padding: "10px 15px", boxSizing: "content-box" } }>
                <div className={classes.topHeader}>
                    <h2>Clients</h2>
                    <ButtonGroup orientation="vertical">
                        <Button className={classes.topButton} style={{background: "blue"}}>
                                <Add />
                            <span>New Client</span>
                        </Button>
                        <Button className={classes.topButton} style={{background: "purple"}}>
                                <FilterList />
                            <span>Show Filter</span>
                        </Button>
                    </ButtonGroup>
                </div>
                <div style={{display: "inline-flex"}}>
                    <Paper component="div"
                    className={classes.root}
                    >
                        <IconButton type="submit"
                        className={classes.iconButton}
                        aria-label="search">
                            <Search />
                        </IconButton>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Clients"
                            id = "search-key"
                            inputProps={{ 'aria-label': 'Search client' }}
                            onChange={this.handleValueChange}
                        />
                    </Paper>
                    <Button onClick={this.search} className={classes.outerBtn}>Search</Button>
                    <Button onClick={this.clear} className={classes.outerBtn}>Clear</Button>
                </div>
                <div style={{ marginTop: 10 }}>
                    <span>{count + " Records found"}</span>
                    <div className={classes.Tablelabel}>
                        <span>All clients</span>
                        <div className="pagination">
                            <span style={{marginRight: 5}}>Page {pageNumber} of {totalPages}</span>
                            <IconButton className={classes.arrows} disabled={prevDisabled} onClick={this.prevPage}>
                                <ArrowBackIos />
                            </IconButton>
                            <IconButton className={classes.arrows} disabled={nextDisabled} onClick={this.nextPage}>
                                <ArrowForwardIos />
                            </IconButton>
                        </div>
                    </div>
                    <TableContainer component="table" style={{borderSpacing: 0}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            onChange={this.onSelectAllClick}
                                            inputProps={{ 'aria-label': 'select all clients' }}
                                        />
                                    </TableCell>                            
                                    <TableCell key="name" align="left">Client Name</TableCell>
                                    <TableCell key="email" align="left">Email</TableCell>
                                    <TableCell key="phone" align="left">Phone</TableCell>
                                    <TableCell key="industry" align="left">Industry</TableCell>
                                    <TableCell key="poc" align="left">Point of Contact</TableCell>
                                    <TableCell key="website" align="left">Website</TableCell>
                                    <TableCell key="edit" align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayList.map((client) => {
                                    return(
                                        <TableRow key={client.clientId} className={classes.cellRows}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                onChange={this.selectbox}
                                                value={client.clientId}
                                                checked={this.isSelected(client.clientId)}
                                                />
                                            </TableCell>
                                            <TableCell>{client.clientName}</TableCell>
                                            <TableCell>{client.clientEmail}</TableCell>
                                            <TableCell>{client.clientPersonalPhone}</TableCell>
                                            <TableCell>{client.clientIndustry}</TableCell>
                                            <TableCell>{client.clientPocName}</TableCell>
                                            <TableCell>{client.clientWebsite}</TableCell>
                                            <TableCell>
                                                <IconButton className={classes.cellEditIcon}>
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            
                    </TableContainer>
                        
                </div>
            </Container>
        )
    }
}

ClientListing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientListing)