import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('open.folder.dialog', () => {
			openDialog({ canSelectFolders: true });
		}), 
		vscode.commands.registerCommand('open.file.dialog', () => {
			openDialog({ canSelectFiles: true });
		})
	);
}

export function deactivate() { }

function openDialog(options: { canSelectFolders?: boolean; canSelectFiles?: boolean }) {
	vscode.window.showOpenDialog({
		title: 'Demo',
		canSelectFolders: options?.canSelectFolders,
		canSelectFiles: options?.canSelectFolders,
		openLabel: 'Open'
	}).then(uris => {
		uris?.forEach(uri => {
			vscode.env.openExternal(uri);
		});
	});
}
