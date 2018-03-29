var React = require('react'),
    _ = require('lodash'),
    edidExtractor = require('./edidextractor'),
    edidDisplayRaw = require('./ediddisplayraw'),
    edidContent = require('./edidContent/edidcontent'),
    fileReader = new FileReader();

// https://www.html5rocks.com/en/tutorials/file/dndfiles/

module.exports = React.createClass({
    componentDidMount: function() {
        var target = document.getElementById('draggable');

        target.addEventListener('drag', this.ondragFunction, false);
        target.addEventListener('dragstart', this.ondragFunction, false);
        target.addEventListener('dragover', this.ondragFunction, false);
        target.addEventListener('drop', this.ondragFunction, false);
    },
    ondragFunction: function(event) {
        event.preventDefault();

        if (event.type === 'drop') {
            var dt = event.dataTransfer;
            if (dt.items) {
                // Use DataTransferItemList interface to access the file(s)
                var f = dt.items[0].getAsFile();
                this.extractEdid(f, f.name);
            }
        }
    },
    getInitialState: function() {
        return {
            edidcontent: _.fill(Array(128), 0)
        };
    },
    getFileExtension: function(filename) {
        return (/[.]/).exec(filename) ? (/[^.]+$/).exec(filename) : undefined;
    },
    handleChange: function() {
        this.extractEdid(
            document.getElementById('files').files[0],
            document.getElementById('files').value
        );
    },
    extractEdid: function(file, filename) {
        fileReader.onloadend = function(evt) {
            // If we use onloadend, we need to check the readyState.
            if (evt.target.readyState === 2) {
                this.setState({
                    edidcontent: edidExtractor.extractEdid(evt.target.result)
                });
            }
        }.bind(this);

        var fileExtension = String(this.getFileExtension(filename));

        if (fileExtension.toLowerCase() === 'dat') {
            fileReader.readAsText(file);
        } else if (fileExtension.toLowerCase() === 'bin') {
            fileReader.readAsBinaryString(file);
        } else {
            console.log('Unknown extension : ', fileExtension);
        }
    },
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.input({
                type: 'file',
                accept: '.dat,.bin',
                id: 'files',
                name: 'file',
                onChange: this.handleChange
            }), React.DOM.div(
                {
                    className: 'edid-container'
                }, React.createElement(edidDisplayRaw, {
                    edid: this.state.edidcontent
                }),
                React.createElement(edidContent, {
                    edid: this.state.edidcontent
                })
            )
        );
    }
});
