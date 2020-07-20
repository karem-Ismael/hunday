
import React, { Component } from 'react';
import { RingLoader
} from "react-spinners";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 10px auto;
  border-color: red;
`;
class Loader extends Component {
    render() {
        return (
                <RingLoader
                    css={override}
                    size={60}
                    color={"#6c757d"}
                />
        );
    }
}

export default Loader;