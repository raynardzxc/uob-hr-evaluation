import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography, CssBaseline, Drawer, AppBar, Toolbar, List, Divider, IconButton,
    Container, Grid, MenuIcon, ChevronLeftIcon, DownloadIcon, Fab
} from '../materialImports';
import { mainListItems } from './listItems';
import axios from 'axios';

const drawerWidth = 240;

const initialState = {
    open: true,
    columns: [
        { title: 'Skill', field: 'skill' },
        { title: 'Beginner Title', field: 'beginTitle' },
        { title: 'Beginner Link', field: 'beginLink' },
        { title: 'Intermediate Title', field: 'interTitle' },
        { title: 'Intermediate Link', field: 'interLink' },
        { title: 'Advanced Title', field: 'advTitle' },
        { title: 'Advanced Link', field: 'advLink' },
    ],
    courseList: null,
    newCourse: null,
    updatedCourse: null,
    deleteIndex: null,
};

const testState = {
    open: true,
    columns: [
        { title: 'Skill', field: 'skill' },
        { title: 'Beginner Title', field: 'beginTitle' },
        { title: 'Beginner Link', field: 'beginLink' },
        { title: 'Intermediate Title', field: 'interTitle' },
        { title: 'Intermediate Link', field: 'interLink' },
        { title: 'Advanced Title', field: 'advTitle' },
        { title: 'Advanced Link', field: 'advLink' },
    ],
    courseList: [
        {
            id: '0',
            skill: 'HE skill',
            beginTitle: 'HE',
            beginLink: 'www.he.com',
            interTitle: 'HEHE',
            interLink: 'www.hehe.com',
            advTitle: 'HEHEHE',
            advLink: 'www.hehehe.com',
        },
        {
            id: '1',
            skill: 'HA skill',
            beginTitle: 'HA',
            beginLink: 'www.ha.com',
            interTitle: 'HAHA',
            interLink: 'www.haha.com',
            advTitle: 'HAHAHA',
            advLink: 'www.hahaha.com',
        },
        {
            id: '2',
            skill: 'HO skill',
            beginTitle: 'HO',
            beginLink: 'www.ho.com',
            interTitle: 'HOHO',
            interLink: 'www.hoho.com',
            advTitle: 'HOHOHO',
            advLink: 'www.hohoho.com',
        },
    ],
    newCourse: null,
    updatedCourse: null,
    deleteIndex: null,
};

const stylesMUI = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = testState;
    }

    componentDidMount(){
        // this.loadCourses();
    }

    // componentDidUpdate () {
    //     this.loadCourses();
    // }

    loadCourses = () => {
        axios.get('getAll')
        .then(response => {
            this.setState({courseList: response.data})
        });
        console.log("[INFO] Load courseList from API")
    }

    newCourseHandler = () => {
        const payload = {
            skill: (typeof this.state.newCourse.skill !== 'undefined') ? this.state.newCourse.skill : ' ',
            beginTitle: (typeof this.state.newCourse.beginTitle !== 'undefined') ? this.state.newCourse.beginTitle : ' ',
            beginLink: (typeof this.state.newCourse.beginLink !== 'undefined') ? this.state.newCourse.beginLink : ' ',
            interTitle: (typeof this.state.newCourse.interTitle !== 'undefined') ? this.state.newCourse.interTitle : ' ',
            interLink: (typeof this.state.newCourse.interLink !== 'undefined') ? this.state.newCourse.interLink : ' ',
            advTitle: (typeof this.state.newCourse.advTitle !== 'undefined') ? this.state.newCourse.advTitle : ' ',
            advLink: (typeof this.state.newCourse.advLink !== 'undefined') ? this.state.newCourse.advLink : ' ',
        };
        axios.post('/create', payload)
        .then(response => {
            console.log(response)
        });
        this.setState({newCourse: null})
        console.log("[INFO] New course added", payload, this.state)
    }

    updateCourseHandler = () => {
        const payload = {
            id: this.state.updatedCourse.id,
            skill: (typeof this.state.updatedCourse.skill !== 'undefined') ? this.state.updatedCourse.skill : ' ',
            beginTitle: (typeof this.state.updatedCourse.beginTitle !== 'undefined') ? this.state.updatedCourse.beginTitle : ' ',
            beginLink: (typeof this.state.updatedCourse.beginLink !== 'undefined') ? this.state.updatedCourse.beginLink : ' ',
            interTitle: (typeof this.state.updatedCourse.interTitle !== 'undefined') ? this.state.updatedCourse.interTitle : ' ',
            interLink: (typeof this.state.updatedCourse.interLink !== 'undefined') ? this.state.updatedCourse.interLink : ' ',
            advTitle: (typeof this.state.updatedCourse.advTitle !== 'undefined') ? this.state.updatedCourse.advTitle : ' ',
            advLink: (typeof this.state.updatedCourse.advLink !== 'undefined') ? this.state.updatedCourse.advLink : ' ',
        };
        axios.post('/update', payload)
        .then(response => {
            console.log(response)
        });
        this.setState({updatedCourse: null})
        console.log("[INFO] Course updated", payload, this.state)
    }

    deleteCourseHandler = () => {
        const payload = {
            params: this.state.deleteIndex
        };
        axios.post('/delete', payload)
        .then(response => {
            console.log(response)
        });
        this.setState({deleteIndex: null})
        console.log("[INFO] Course deleted", payload, this.state)
    }

    handleDrawerOpen = () => {
        this.setState({open: true})
    };
    handleDrawerClose = () => {
        this.setState({open: false})
    };

    handleDownload = () => {
        alert("SHIVA")
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            UOB Admin Panel
                        </Typography>
                        <Fab 
                            variant="extended" 
                            className={classes.button} 
                            size="small" 
                            color="primary"
                            onClick={this.handleDownload}>
                            <DownloadIcon className={classes.leftIcon} />
                            Download
                        </Fab>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}>
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <link
                                    rel="stylesheet"
                                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                                />
                                <MaterialTable
                                    title="Course List"
                                    columns={this.state.columns}
                                    data={this.state.courseList}
                                    editable={{
                                        onRowAdd: newData =>
                                            new Promise(resolve => {
                                                setTimeout(() => {
                                                    {
                                                        const courseList = [...this.state.courseList];
                                                        courseList.push(newData);
                                                        this.setState({ newCourse: newData })
                                                        this.setState({ ...this.state, courseList });
                                                        this.newCourseHandler();
                                                        this.loadCourses();
                                                    }
                                                    resolve();
                                                }, 1000);
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise(resolve => {
                                                setTimeout(() => {
                                                    {
                                                        const courseList = [...this.state.courseList];
                                                        const index = courseList.indexOf(oldData);
                                                        courseList[index] = newData;
                                                        this.setState({updatedCourse: newData})
                                                        this.setState({ ...this.state, courseList });
                                                        this.updateCourseHandler();
                                                        this.loadCourses();
                                                    }
                                                    resolve();
                                                }, 1000);
                                            }),
                                        onRowDelete: oldData =>
                                            new Promise(resolve => {
                                                setTimeout(() => {
                                                    {
                                                        const courseList = [...this.state.courseList];
                                                        const index = courseList.indexOf(oldData)
                                                        this.setState({deleteIndex: index})
                                                        courseList.splice(index, 1);
                                                        this.setState({ ...this.state, courseList });
                                                        this.deleteCourseHandler();
                                                        this.loadCourses();
                                                    }
                                                    resolve();
                                                }, 1000);
                                            }),
                                    }}
                                    options={{
                                        actionsColumnIndex: -1
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(stylesMUI)(Dashboard));