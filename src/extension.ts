'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as http from 'http';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "hipsum" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.hipsum', () => {
        // The code you place here will be executed every time your command is executed

        const editor = vscode.window.activeTextEditor;

        http.get('http://hipsterjesus.com/api/?paras=1&html=false', (res) => {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                console.log(body);
                editor.edit((eb) => {
                    eb.insert(editor.selection.active, JSON.parse(body).text);
                });
            });
            res.on('error', function (e) {
                console.log("Got error: " + e.message);
            });
    });
});

context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}