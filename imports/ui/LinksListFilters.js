import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';
export default class LinksListFilters extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showVisible: true
    };
  }

  componentDidMount(){
    this.checkboxTracker = Tracker.autorun( () => {
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }

  componentWillUnMount(){
    this.checkboxTracker.stop()
  }

  render(){
    return (
      <div>
        <label className="checkbox">
          <input
            className="checkbox-box"
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={ () => {
              Session.set('showVisible', !Session.get('showVisible'))
          }}/>
          Show Hidden Links
        </label>
      </div>
    );
  }
}
