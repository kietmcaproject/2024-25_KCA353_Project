
// import React, { useEffect, useRef } from 'react';
// import MonacoEditor from '@monaco-editor/react';
// import ACTIONS from '../Actions';

// const Editor = ({ socketRef, roomId, onCodeChange }) => {
//     const editorRef = useRef(null);

//     // Define the custom theme before the editor mounts
//     const handleEditorWillMount = (monaco) => {
//         monaco.editor.defineTheme('custom-theme', {
//             base: 'vs-dark', // Base theme (dark)
//             inherit: true,
//             rules: [
//                 { token: 'keyword', foreground: 'FF79C6' },
//                 { token: 'comment', foreground: '6272A4', fontStyle: 'italic' },
//                 { token: 'string', foreground: 'F1FA8C' },
//                 { token: 'number', foreground: 'BD93F9' },
//                 { token: 'identifier', foreground: '50FA7B' },
//             ],
//             colors: {
//                 'editor.background': '#282A36', // Background color
//                 'editor.foreground': '#F8F8F2', // Default text color
//             },
//         });
//     };

//     // Handle editor mounting and setup
//     const handleEditorDidMount = (editor, monaco) => {
//         editorRef.current = editor;

//         // Set up listener for editor content changes
//         editor.onDidChangeModelContent(() => {
//             const code = editor.getValue();
//             onCodeChange(code);
//             if (socketRef?.current) {
//                 socketRef.current.emit(ACTIONS.CODE_CHANGE, {
//                     roomId,
//                     code,
//                 });
//             }
//         });

//         // Apply the custom theme
//         monaco.editor.setTheme('custom-theme');
//     };

//     // Listen to incoming socket events for code changes
//     useEffect(() => {
//         if (socketRef?.current) {
//             const handleCodeChange = ({ code }) => {
//                 if (code !== null && editorRef.current) {
//                     const currentCode = editorRef.current.getValue();
//                     if (currentCode !== code) {
//                         editorRef.current.setValue(code);
//                     }
//                 }
//             };

//             socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

//             // Cleanup the listener on unmount
//             return () => {
//                 socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
//             };
//         }
//     }, [socketRef.current]);

//     return (
//         <MonacoEditor
//             height="90vh"
//             defaultLanguage="cpp" // Language for syntax highlighting
//             beforeMount={handleEditorWillMount} // Define custom theme
//             onMount={handleEditorDidMount} // Handle editor setup
//             options={{
//                 fontSize: 14, // Font size
//                 minimap: { enabled: false }, // Disable minimap
//                 automaticLayout: true, // Automatically adjust layout
//                 wordWrap: 'on', // Wrap long lines
//                 scrollBeyondLastLine: false, // Prevent scrolling past the last line
//             }}
//         />
//     );
// };

// export default Editor;

// // import React, { useEffect, useRef } from 'react';
// // import Codemirror from 'codemirror';
// // import 'codemirror/lib/codemirror.css';
// // import 'codemirror/theme/dracula.css';
// // import 'codemirror/mode/javascript/javascript';
// // import 'codemirror/addon/edit/closetag';
// // import 'codemirror/addon/edit/closebrackets';
// // import ACTIONS from '../Actions';

// // const Editor = ({ socketRef, roomId, onCodeChange }) => {
// //     const editorRef = useRef(null);
// //     useEffect(() => {
// //         async function init() {
// //             editorRef.current = Codemirror.fromTextArea(
// //                 document.getElementById('realtimeEditor'),
// //                 {
// //                     mode: { name: 'javascript', json: true },
// //                     theme: 'dracula',
// //                     autoCloseTags: true,
// //                     autoCloseBrackets: true,
// //                     lineNumbers: true,
// //                 }
// //             );

// //             editorRef.current.on('change', (instance, changes) => {
// //                 const { origin } = changes;
// //                 const code = instance.getValue();
// //                 onCodeChange(code);
// //                 if (origin !== 'setValue') {
// //                     socketRef.current.emit(ACTIONS.CODE_CHANGE, {
// //                         roomId,
// //                         code,
// //                     });
// //                 }
// //             });
// //         }
// //         init();
// //     }, []);

// //     useEffect(() => {
// //         if (socketRef.current) {
// //             socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
// //                 if (code !== null) {
// //                     editorRef.current.setValue(code);
// //                 }
// //             });
// //         }

// //         return () => {
// //             socketRef.current.off(ACTIONS.CODE_CHANGE);
// //         };
// //     }, [socketRef.current]);

// //     return <textarea id="realtimeEditor"></textarea>;
// // };

// // export default Editor;


// import React, { useEffect, useRef } from 'react';
// import Codemirror from 'codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/edit/closebrackets';
// import ACTIONS from '../Actions';

// const Editor = ({ socketRef, roomId, onCodeChange }) => {
//     const editorRef = useRef(null);
//     useEffect(() => {
//         async function init() {
//             editorRef.current = Codemirror.fromTextArea(
//                 document.getElementById('realtimeEditor'),
//                 {
//                     mode: { name: 'javascript', json: true },
//                     theme: 'dracula',
//                     autoCloseTags: true,
//                     autoCloseBrackets: true,
//                     lineNumbers: true,
//                 }
//             );

//             editorRef.current.on('change', (instance, changes) => {
//                 const { origin } = changes;
//                 const code = instance.getValue();
//                 onCodeChange(code);
//                 if (origin !== 'setValue') {
//                     socketRef.current.emit(ACTIONS.CODE_CHANGE, {
//                         roomId,
//                         code,
//                     });
//                 }
//             });
//         }
//         init();
//     }, []);

//     useEffect(() => {
//         if (socketRef.current) {
//             socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
//                 if (code !== null) {
//                     editorRef.current.setValue(code);
//                 }
//             });
//         }

//         return () => {
//             socketRef.current.off(ACTIONS.CODE_CHANGE);
//         };
//     }, [socketRef.current]);

//     return <textarea id="realtimeEditor"></textarea>;
// };

// export default Editor;


import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        async function init() {
            // Initialize the CodeMirror editor
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            // Handle editor changes
            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code); // Trigger the callback for code change
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }

        init();
    }, []); // Empty dependency array ensures this runs only once on mount

    useEffect(() => {
        if (socketRef.current) {
            // Listen for CODE_CHANGE events from the server
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            // Cleanup to avoid memory leaks
            if (socketRef?.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE);
            }
        };
    }, [socketRef.current]); // Add dependencies to avoid stale references

    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
