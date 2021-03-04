import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link, Route, Switch
} from "react-router-dom";
import CreateAccount from '../CreateAccount';
import Home from '../Home';
import Leaderboard from '../Leaderboard';
import Login from '../Login';
import TestComp from '../TestComp';
import Progress from '../Progress';
import Schedule from '../Schedule';
import Games, { gamelinks } from '../Games';
import './App.css';
import { AppBar, IconButton, Toolbar, List, ListItem, ListItemText } from '@material-ui/core';
import { Home as HomeIcn, ExitToApp } from '@material-ui/icons';
import 'fontsource-roboto';


import {login, getUser} from '../../backend/userAPI'

class App extends Component {
  constructor(props) {
    super(props)
    this.gamelinks = gamelinks

    this.navref = React.createRef();

    this.navlinks = [
      {
        title: 'Leaderboard',
        path: '/leaderboard',
        element: (<Leaderboard />)
      }, {
        title: 'Progress',
        path: '/progress',
        element: (<Progress games={this.gamelinks.map(g => g.title)} />)
      }, {
        title: 'Games',
        path: '/games',
        element: (<Games gamelinks={this.gamelinks} />)
      }, {
        title: 'Schedule',
        path: '/schedule',
        element: (<Schedule />)
      },
    ]

    this.nonNavlinks = [
      {
        path: '/',
        element: (<Login login={(user, pass) => this.login(user, pass)} />)
      }, {
        path: '/createaccount',
        element: (<CreateAccount />)
      }
    ]

    this.state = {
      defaultUser: getUser(1),
      loggedIn: true
    }


  }

  login(user, pass) {
    if (login(user, pass)) {
      this.setState({
        loggedIn: true
      })
    }
  }

  logout() {
    this.setState({
      loggedIn: false
    })
  }

  moveGradient(e) {
    // const light = [e.screenX / 2, 0];
    // const mouse = [e.clientX, e.clientY];

    // let angle = Math.atan2(light[1]-mouse[1], light[0]-mouse[0]);
    // angle = Math.round((360 + (180 * angle / Math.PI))) % 360;
    // let angle = 180;
    // this.navref.current.style.background =
    //   `linear-gradient(${angle}, red 0%, var(--primary) 100%)`;
    // console.log(angle)
  }

  componentDidMount() {
    // this.gradientmover = (e) => this.moveGradient(e);
    // document.addEventListener('mousemove', this.gradientmover);
  }

  componentWillUnmount() {
    // if (this.gradientmover) {
    //   document.removeEventListener('mousemove', this.gradientmover);
    // }
  }

  render() {
    return (
      <Router>
        {this.state.loggedIn ?
          <AppBar position='static'>
            <Toolbar className='homenav' ref={this.navref}>
              <List>

                <Link to='/' onClick={() => this.logout()} key='logout'>
                  <IconButton>
                    <ExitToApp className='homebtn' />
                  </IconButton>
                </Link>

                <Link to='/home' key='home'>
                  <IconButton>
                    <HomeIcn className='homebtn' />
                  </IconButton>
                </Link>
              </List>
              <List className='homenav'>
                {
                  this.navlinks.map(({ title, path }) => (
                    <Link to={path} key={title} className='navtext'>
                      <ListItem button>
                        <ListItemText
                          primary={title}
                          primaryTypographyProps={{variant:'h5'}}
                        />
                      </ListItem>
                    </Link>
                  ))
                }
              </List>
            </Toolbar>
          </AppBar>
          : null
        }


        <Switch>
          {/* home route */}
          <Route exact path='/home'>
            <Home user={this.state.defaultUser} />
          </Route>
          {  // page routes
            this.navlinks.map(({ title, path, element }) => (
              <Route key={path} exact path={path}>
                {element}
              </Route>
            ))
          }
          {  // game routes
            this.gamelinks.map(({ title, path, element }) => (
              <Route key={path} exact path={path}>
                {element}
              </Route>
            ))
          }
          {  // game routes
            this.nonNavlinks.map(({ path, element }) => (
              <Route key={path} exact path={path}>
                {element}
              </Route>
            ))
          }
        </Switch>
      </Router >
    );
  }
}

App.title = 'Team 05';

export default App;
