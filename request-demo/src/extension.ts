import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('request-demo.perform-request', () => {
		axios.get('https://www.google.com/').then(v => {
			vscode.window.showInformationMessage('status:' + v.status);
		}).catch(e => {
			vscode.window.showErrorMessage('Error: ' + e);
		});
	}));
}

export function deactivate() {}