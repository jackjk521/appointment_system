import moment from "moment";

const EventItem = ({ info }) => {
    const { event } = info;
    const start = moment(event.start).format("hh:mm");
    const end = moment(event.end).format("h:mm");

    return (
        <button className="btn btn-primary h-100 w-100">
            <div className="d-flex justify-content-center h-100">
                <div className="row">
                    <div className="col-12"></div>
                    <div className="col-12">
                        <p className="w-100">
                            {" "}
                            {start} - {end}{" "}
                        </p>
                        <p className="fw-bold w-100"> {event.title}</p>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default EventItem;