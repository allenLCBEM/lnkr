import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      justCopied: false
    };
  }

  componentDidMount(){
    this.clip = new Clipboard(this.refs.copy);

    this.clip.on('success', () => {
      this.setState({justCopied:true});
      setTimeout( () => this.setState({justCopied:false}), 1000);
    }).on('error', () => {
      alert('copy failed');
    })
  }

  componentWillUnMount(){
    this.clip.destroy();
  }

  renderStats(){
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if(typeof this.props.lastVisitedAt === 'number'){
      visitedMessage = `(visted ${moment(this.props.lastVisitedAt).fromNow()})`
    }
    return  <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
  }

  render(){
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p>{this.props.shortUrl}</p>
        {/* <p>visible: {this.props.visible.toString()}</p> */}
        {this.renderStats()}
        <a className="button button-link" href={this.props.shortUrl} target="_blank">
          Go to Link...
        </a>
        <button className="button" ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied':'Copy'}
        </button>
        <button className="button" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.PropTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
