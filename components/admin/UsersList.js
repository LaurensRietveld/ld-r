import React from 'react';
import UserStore from '../../stores/UserStore';
import {connectToStores} from 'fluxible/addons';
import {NavLink} from 'fluxible-router';

class UsersList extends React.Component {
    render() {
      let list, dbClass='yellow user icon', user = this.context.getUser();
      let currentComponent=this;
      if(!user || !parseInt(user.isSuperUser)){
          return (
              <div className="ui page grid">
                <div className="row">
                  <div className="column">
                    <h1 className="ui header">Permission denied!</h1>
                      <div className="ui segment">
                          <div className="ui warning message"><div className="header">Sorry! You do not have enough permission to access this page!</div></div>
                      </div>
                  </div>
                </div>
              </div>
          )
      }
      if(this.props.UserStore.users){
        list = this.props.UserStore.users.map(function(node, index) {
            if(parseInt(node.isActive)){
                dbClass='green user icon'
            }else{
                dbClass='yellow user icon'
            }
            //do not show current super user to edit himself
            if(node.v !== user.id){
                return (
                  <div className="item animated fadeIn" key={index}>
                      <NavLink routeName="resource" href={'/dataset/'+ encodeURIComponent(currentComponent.props.UserStore.graphName) +'/resource/' + encodeURIComponent(node.v)} >
                      <div className="content"> <i className={dbClass}></i> {node.title} </div>
                    </NavLink>
                  </div>
                )
            }
        });
      }else{
        list=<div className="ui warning message"><div className="header"> Sorry! No user found!</div></div>
      }
        return (
          <div className="ui page grid">
            <div className="row">
              <div className="column">
                <h1 className="ui header">Registered Users</h1>
                  <div className="ui segment">
                    <div className="ui huge divided animated list">
                      {list}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}
UsersList.contextTypes = {
    getUser: React.PropTypes.func
};
UsersList = connectToStores(UsersList, [UserStore], function (stores, props) {
    return {
        UserStore: stores.UserStore.getState()
    };
});
export default UsersList;
