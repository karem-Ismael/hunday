import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pdfFiles, getPdfUrl } from '../../../../../../store/actions';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import './style.scss'
import { css } from "@emotion/core";
import { FadeLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 10px auto;
  border-color: red;

`;
class PdfFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
    }
    componentDidMount() {
        this.getFiles()
    }
    getFiles = () => {
        this.props.pdfFiles()
            .then(({ payload }) => {
                let initFiles = [];
                payload.map(i =>
                    initFiles = [...initFiles, {
                        name: i.cat_name,
                        folder: i.cat_folder,
                        path: i.path
                    }])

                this.setState({
                    files: initFiles
                })
            })
    }
    getPath = (path) => {
        this.props.getPdfUrl(path)
    }
    render() {
        const style = {
            height: 240,
            flexGrow: 1,
            maxWidth: 400,
        }
        // const classes = useStyles();
        return (
            <div className='files'>
                <TreeView
                    className={style}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem nodeId="1" label="Colour Code Instructions">
                        {this.state.files.length === 0 ? <FadeLoader
                            css={override}
                            size={20}
                            //size={"150px"} this also works
                            color={"#002000"}
                        /> : this.state.files.map(node => {
                            return <TreeItem nodeId={node} onClick={() => this.getPath(node.path)} label={node.name} />
                        })}
                    </TreeItem>

                </TreeView>
            </div>
        );
    }
}

export default connect(null, { pdfFiles, getPdfUrl })(PdfFiles);
