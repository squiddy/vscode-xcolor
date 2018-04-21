'use strict';

import {exec} from 'child_process';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerTextEditorCommand('extension.pickScreenColor', textEditor => {
        const process = exec('xcolor');
        process.stdout.on('data', data => {
            textEditor.edit(edit => {
                edit.insert(textEditor.selection.active, data.toString().trim());
            });
        });
        process.stderr.on('data', data => {
            vscode.window.showErrorMessage('vscode-xcolor: ' + data.toString());
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}