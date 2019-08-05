import React from 'react';
import UploadConnector from '../connectors/UploadConnector';
import { Modal, Button } from 'react-bootstrap';

import Dropzone from './Dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UploadModal = class UploadModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
  }

  onFilesAdded(arr) {
    this.setState({ files: this.state.files.concat(arr) });
  }

  removeFile(file_name) {
    this.setState({ files: this.state.files.filter(file => file.name !== file_name )});
  }

  handleUpload() {
    if (this.state.files.length) {
      this.props.uploadFiles(this.state.files);
      this.setState({ files: [] });
      this.props.hideUploadForm();
    }
  }

  handleClose() {
    this.props.hideUploadForm();
  }

  render() {
    return (
      <Modal show={this.props.isUploadShown} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropzone onFilesAdded={this.onFilesAdded} />
          <section className="file-list">
            { this.state.files.map(file => ( <div className="selected_file" key={file.name }> <a href="#" onClick={() => this.removeFile(file.name) }><FontAwesomeIcon icon="times-circle" /></a> { file.name }</div> ) ) }
          </section>
        </Modal.Body>
        <Modal.Footer>
         <Button onClick={this.handleClose}>Cancel</Button>
         <Button className="btn-primary" onClick={this.handleUpload}>Upload Selected Files</Button>
      </Modal.Footer>
      </Modal>
    )
  }
}

export default UploadConnector(UploadModal);