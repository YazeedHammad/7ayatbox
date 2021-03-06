import React, { Component } from "react";

import "./Cart.css";
import $ from "jquery";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: this.props.result2,
      userID: this.props.user.id
    };
  }

  handleSubmit = () => {
    console.log(
      "the result",
      this.props.result2[0].serviceID,
      this.state.userID,
      this.props.result2[0].providerID
    );
    $.ajax({
      url: "/reservation/addReservation",
      type: "POST",
      data: {
        cartDetails: this.props.result2,
        userID: this.state.userID,
        providerID: this.props.result2[0].providerID
      },
      success: data => {
        alert("Hi");
        console.log("success", data);
      },
      error: err => {
        console.log("ERROR");
      }
    });
  };

  total = () => {
    var total = 0;
    var x = this.props.result2;

    for (var i = 0; i < x.length; i++) {
      total = total + x[i].price;
    }
    return total;
  };

  render() {
    console.log("my state", this.state);

    let mystyle = {
      borderTop: "1px solid #ddd",
      marginTop: "10px"
    };

    return (
      <div>
        <div className="container">
          {this.state.result.map((result, index) => {
            return (
              <div className="row">
                {" "}
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="card">
                    <img
                      src={result.imageUrl}
                      className="card-img-top"
                      alt=""
                    />

                    <div className="card-block text-left">
                      <h4 className="card-title">{result.title}</h4>
                      <p className="card-text">{result.description}</p>
                      <p className="card-text">{result.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            style={{
              marginTop: "30px",
              backgroundColor: "#F6F6F6",
              padding: "10px"
            }}
          >
            <h3 className="row" style={{ fontWeight: 400 }}>
              <span className="col-6">total price:</span>
              <span className="col-6 text-right">${this.total()}</span>
            </h3>
            <h3 className="row" style={{ fontWeight: 400 }}>
              <span className="col-6">tax (15%):</span>
              <span className="col-6 text-right">${this.total() * 0.15}</span>
            </h3>
            <h3 className="row" style={mystyle}>
              <span className="col-6">tota inc tax:</span>
              <span className="col-6 text-right">
                ${this.total() * 0.15 + this.total()}
              </span>
            </h3>
          </div>
          <div className="row">
            <div className="col-6" />
            <div className="col-6">
              <div className="Save-cart" />
              <button onClick={this.handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};
export default connect(mapStateToProps)(Cart);
