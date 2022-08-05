import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "settings-demo" is now active!');
	let disposable = vscode.commands.registerCommand('settings-demo.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from settings-demo!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
