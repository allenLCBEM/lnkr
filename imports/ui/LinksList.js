import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';

import {Links} from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      links:[]
    };
  }
  componentDidMount(){
    this.linksTracker = Tracker.autorun( () => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links});
    });
  }

  componentWillUnMount(){
    this.linksTracker.stop();
  }

  renderLinksListItems(){
    if(this.state.links.length == 0){
      return (
          <div className="item">
            <p className="item-message">No Links Found</p>
          </div>
      );
    } else {
      return this.state.links.map((item) => {
        const shortUrl = Meteor.absoluteUrl(item._id);
        return <LinksListItem key={item._id} shortUrl={shortUrl} {...item} />
            //<p key={item._id}>{item.url}</p>
      });
    }
  }


  render(){
    return (
        <div>
          <FlipMove maintainContainerHeight={true} >
            {this.renderLinksListItems()}
          </FlipMove>
        </div>
    );
  }
};
