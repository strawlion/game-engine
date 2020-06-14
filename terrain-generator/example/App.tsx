import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store';

import TerrainBuilder from './TerrainBuilder';

// const mapStateToProps = (state /*, ownProps*/) => {
//     return {
//       counter: state.counter
//     }
//   }

//   const mapDispatchToProps = { increment, decrement, reset }
export default App;

function App(props) {

    return (
    <Provider store={ store }>
        <style
            dangerouslySetInnerHTML={{
                __html: `
                    html, body, .app {
                        height: 100%;
                    }
                    body {
                        margin: 0;
                    }
                `
            }}
        />
        <TerrainBuilder />
    </Provider>
    );
}

const appContainer = document.createElement('div');
appContainer.id = 'app';
document.body.append(appContainer);

ReactDOM.render(<App />, appContainer);
