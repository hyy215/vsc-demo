import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('request-demo.perform-request', () => {
		axios.get('https://www.google.com/', {
			proxy: false
		}).then(v => {
			vscode.window.showInformationMessage('status:' + v.status);
		}).catch(e => {
			vscode.window.showErrorMessage(e);
		});
	}));
}

export function deactivate() {}