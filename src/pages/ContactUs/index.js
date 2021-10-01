import React from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.scss';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
)

const ContactUs = props => {
    return (
        <div>
            <div className="block-map block">
                <div className="block-map__body">
                    <MyMapComponent
                        isMarkerShown
                    />
                </div>
            </div>
            <PageHeader title={"Contact Us"} />
            <div className="block">
                <div className="container">
                    <div className="card mb-0">
                        <div className="card-body contact-us">
                            <div className="contact-us__container">
                                <div className="row">
                                    <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                                        <h4 className="contact-us__header card-title">
                                            Our Address
                                        </h4>
                                        <div className="contact-us__address">
                                            <p>
                                                715 Fake Ave, Apt. 34, New York, NY 10021 USA
                                                <br />
                                                Email: stroyka@example.com
                                                <br />
                                                Phone Number: +1 754 000-00-00
                                            </p>
                                            <p>
                                                <strong>Opening Hours</strong>
                                                <br />
                                                Monday to Friday: 8am-8pm
                                                <br />
                                                Saturday: 8am-6pm
                                                <br />
                                                Sunday: 10am-4pm
                                            </p>
                                            <p>
                                                <strong>Comment</strong> <br />
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Curabitur suscipit suscipit mi, non tempor
                                                nulla finibus eget. Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <h4 className="contact-us__header card-title">
                                            Leave us a Message
                                        </h4>
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmFor="form-name">Your Name</label>
                                                    <input id="form-name" type="text" placeholder="Your Name" className="form-control" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmFor="form-email">Email</label>
                                                    <input id="form-email" type="email" placeholder="Email Address" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmFor="form-subject">Subject</label>
                                                <input id="form-subject" type="text" placeholder="Subject" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmFor="form-message">Message</label>
                                                <textarea id="form-message" rows="4" className="form-control"></textarea></div>
                                            <button type="submit" className="btn btn-primary">
                                                Send Message
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;