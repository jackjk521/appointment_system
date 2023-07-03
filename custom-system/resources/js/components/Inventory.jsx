import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Inventory = ({ user }) => {
    return (
        <>
            <div className="container">
                <h1>Inventory</h1>
                <h5>{user.username}</h5>

                <table
                    id="tblTrailer"
                    class="table table-condensed table-hover"
                    data-toolbar="#toolbar"
                    data-search="true"
                    data-show-refresh="true"
                    data-show-toggle="true"
                    data-show-columns="true"
                    data-show-export="true"
                    data-detail-view="false"
                    data-minimum-count-columns="2"
                    data-show-pagination-switch="true"
                    data-side-pagination="server"
                    data-pagination="true"
                    data-id-field="trailer_id"
                    data-page-list="[5, 10, 25, 50, 100, ALL]"
                    data-show-footer="false"
                >
                    <thead>
                        <tr>
                            <th
                                data-field="trailer_id"
                                data-formatter="IDFormatter"
                            >
                                Trailer ID
                            </th>
                            <th data-field="trailer_number">Trailer Number</th>
                            <th data-field="plate_no">Plate No.</th>
                            <th data-field="trailer_body_no">Body No.</th>
                            <th data-field="model_year">Model Year</th>
                            <th
                                data-field="action"
                                data-formatter="actionFormatter"
                                data-events="operateEvents"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    );
};

export default Inventory;
