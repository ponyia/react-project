import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import FormFeedback from 'reactstrap/lib/FormFeedback';

const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            touched: {
                author: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(event) {
        alert('The Feedback is' + JSON.stringify(event));
        console.log('The Feedback is' + JSON.stringify(event));
        this.toggleModal();
    }
    validate(author) {
         const errors = {
             author: ''
         };
         if (this.state.touched.author) {
             if (author.length < 2) {
                 errors.author = 'Must be at least 2 characters.';
             } else if (author.length > 15) {
                 errors.author = 'Must be 15 characters or less.'
             }
         }
         return errors;
        }
     handleBlur = (field) => () => {
         this.setState({
             touched: {...this.state.touched, [field]: true}
         });
    }
    render() {
        const errors = this.validate(this.state.author);
        return (
            <React.Fragment>
                <div>
                    <Button onClick={this.toggleModal} outline>
                        <i className="fa fa-pencil fa-lg"></i>Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={event => this.handleSubmit(event)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select className="form-control" model=".rating" id="rating" name="rating" innerRef={input => this.rating = input}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text className="form-control" model=".author" id="author" name="author" placeholder="Your Name" innerRef={input => this.author = input}
                                    validators={{
                                        maxLength: maxLength(15),
                                        minLength: minLength(2)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: "Must be at least 2 character",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea className="form-control" model=".text" id="text" name="text" rows="6" innerRef={input => this.text = input} />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}
function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text}<br />
                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                })}
                <CommentForm />
            </div>
        );
    }
    return <div />
}
function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}
export default CampsiteInfo;