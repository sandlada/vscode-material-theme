/**
 * Runtime workbench tokens snapshot (source of truth for which tokens exist).
 *
 * Source: `monaco-workbench.css` (`.monaco-workbench` live export, light appearance).
 * Counts in this snapshot: 874 color tokens + 47 layout tokens = 921 total.
 *
 * Mapping rule (colors only): theme color ID `a.b.c` <--> CSS variable
 * `--vscode-a-b-c` (dots become dashes; IDs never contain a literal dash, so the
 * mapping is 1:1 - `cssVariableName()` / `themeColorIdFor()` below implement it).
 * Layout tokens (font sizes, weights, radii, spacing) are NOT theme color IDs;
 * they are keyed here by their raw CSS suffix (e.g. `spacing-size20`).
 *
 * Notes:
 * - VSCode only emits a CSS var for a token with a resolved value. IDs absent
 *   from this snapshot fall back to VSCode defaults at runtime (no CSS var).
 * - The curated generator schema (`src/vscode-schema.js`, 179 workbench color
 *   IDs) is a subset: every schema key resolves to one of the color IDs below.
 * - Each interface property carries the live-exported value as `@example` so the
 *   snapshot doubles as a value reference. Values are examples, not contracts.
 * - Property names are alphabetically sorted within each scope group for stable diffs.
 */

export const VSCODE_CSS_VAR_PREFIX = '--vscode-' as const;

/** All 874 runtime color IDs (dot notation), alphabetical. */
export const VSCODE_WORKBENCH_COLOR_IDS = [
    'actionBar.toggledBackground',
    'activeSessionView.background',
    'activeSessionView.foreground',
    'activityBar.activeBackground',
    'activityBar.activeBorder',
    'activityBar.background',
    'activityBar.border',
    'activityBar.dropBorder',
    'activityBar.foreground',
    'activityBar.inactiveForeground',
    'activityBarBadge.background',
    'activityBarBadge.foreground',
    'activityBarTop.activeBorder',
    'activityBarTop.dropBorder',
    'activityBarTop.foreground',
    'activityBarTop.inactiveForeground',
    'activityErrorBadge.background',
    'activityErrorBadge.foreground',
    'activityWarningBadge.background',
    'activityWarningBadge.foreground',
    'agentFeedbackEditorWidget.background',
    'agentFeedbackEditorWidget.border',
    'agentFeedbackInputWidget.border',
    'agentSessionReadIndicator.foreground',
    'agentSessionSelectedBadge.border',
    'agentSessionSelectedUnfocusedBadge.border',
    'agentStatusIndicator.background',
    'agents.background',
    'agentsBadge.background',
    'agentsBadge.foreground',
    'agentsBottomPanel.border',
    'agentsCard.border',
    'agentsChatInput.background',
    'agentsChatInput.border',
    'agentsChatInput.focusBorder',
    'agentsChatInput.foreground',
    'agentsChatInput.placeholderForeground',
    'agentsGradient.tintColor',
    'agentsNewSessionButton.background',
    'agentsNewSessionButton.border',
    'agentsNewSessionButton.foreground',
    'agentsNewSessionButton.hoverBackground',
    'agentsPanel.background',
    'agentsPanel.border',
    'agentsPanel.foreground',
    'agentsUnreadBadge.background',
    'agentsUnreadBadge.foreground',
    'agentsUpdateButton.downloadedBackground',
    'agentsUpdateButton.downloadingBackground',
    'agentsVoice.speakingBackground',
    'agentsVoice.speakingForeground',
    'badge.background',
    'badge.foreground',
    'banner.background',
    'banner.foreground',
    'banner.iconForeground',
    'breadcrumb.activeSelectionForeground',
    'breadcrumb.background',
    'breadcrumb.focusForeground',
    'breadcrumb.foreground',
    'breadcrumbPicker.background',
    'browser.border',
    'button.background',
    'button.border',
    'button.foreground',
    'button.hoverBackground',
    'button.secondaryBackground',
    'button.secondaryBorder',
    'button.secondaryForeground',
    'button.secondaryHoverBackground',
    'button.separator',
    'chart.axis',
    'chart.guide',
    'chart.line',
    'charts.blue',
    'charts.foreground',
    'charts.green',
    'charts.lines',
    'charts.orange',
    'charts.purple',
    'charts.red',
    'charts.yellow',
    'chat.avatarBackground',
    'chat.avatarForeground',
    'chat.checkpointSeparator',
    'chat.dictationActiveMicGlow',
    'chat.editedFileForeground',
    'chat.findMatchBackground',
    'chat.findMatchHighlightBackground',
    'chat.inputWorkingBorderColor1',
    'chat.inputWorkingBorderColor2',
    'chat.inputWorkingBorderColor3',
    'chat.linesAddedForeground',
    'chat.linesRemovedForeground',
    'chat.requestBackground',
    'chat.requestBorder',
    'chat.requestBubbleBackground',
    'chat.requestBubbleHoverBackground',
    'chat.requestCodeBorder',
    'chat.sessionStateIndicator.inProgressBorder',
    'chat.sessionStateIndicator.needsInputBorder',
    'chat.sessionStateIndicator.unvisitedBorder',
    'chat.slashCommandBackground',
    'chat.slashCommandForeground',
    'chat.statusBackground',
    'chat.thinkingShimmer',
    'chat.voiceGlowBaseColor',
    'chat.workingProgressInsidersIconForeground',
    'chat.workingProgressStableIconForeground',
    'checkbox.background',
    'checkbox.border',
    'checkbox.disabled.background',
    'checkbox.disabled.foreground',
    'checkbox.foreground',
    'checkbox.selectBackground',
    'checkbox.selectBorder',
    'commandCenter.activeBackground',
    'commandCenter.activeBorder',
    'commandCenter.activeForeground',
    'commandCenter.background',
    'commandCenter.border',
    'commandCenter.debuggingBackground',
    'commandCenter.foreground',
    'commandCenter.inactiveBorder',
    'commandCenter.inactiveForeground',
    'commentsView.resolvedIcon',
    'commentsView.unresolvedIcon',
    'debugConsole.errorForeground',
    'debugConsole.infoForeground',
    'debugConsole.sourceForeground',
    'debugConsole.warningForeground',
    'debugConsoleInputIcon.foreground',
    'debugExceptionWidget.background',
    'debugExceptionWidget.border',
    'debugIcon.breakpointCurrentStackframeForeground',
    'debugIcon.breakpointDisabledForeground',
    'debugIcon.breakpointForeground',
    'debugIcon.breakpointStackframeForeground',
    'debugIcon.breakpointUnverifiedForeground',
    'debugIcon.continueForeground',
    'debugIcon.disconnectForeground',
    'debugIcon.pauseForeground',
    'debugIcon.restartForeground',
    'debugIcon.startForeground',
    'debugIcon.stepBackForeground',
    'debugIcon.stepIntoForeground',
    'debugIcon.stepOutForeground',
    'debugIcon.stepOverForeground',
    'debugIcon.stopForeground',
    'debugTokenExpression.boolean',
    'debugTokenExpression.error',
    'debugTokenExpression.name',
    'debugTokenExpression.number',
    'debugTokenExpression.string',
    'debugTokenExpression.type',
    'debugTokenExpression.value',
    'debugToolBar.background',
    'debugView.exceptionLabelBackground',
    'debugView.exceptionLabelForeground',
    'debugView.stateLabelBackground',
    'debugView.stateLabelForeground',
    'debugView.valueChangedHighlight',
    'descriptionForeground',
    'diffEditor.diagonalFill',
    'diffEditor.insertedLineBackground',
    'diffEditor.insertedTextBackground',
    'diffEditor.move.border',
    'diffEditor.moveActive.border',
    'diffEditor.removedLineBackground',
    'diffEditor.removedTextBackground',
    'diffEditor.unchangedCodeBackground',
    'diffEditor.unchangedRegionBackground',
    'diffEditor.unchangedRegionForeground',
    'diffEditor.unchangedRegionShadow',
    'disabledForeground',
    'dropdown.background',
    'dropdown.border',
    'dropdown.foreground',
    'dropdown.listBackground',
    'editor.background',
    'editor.border',
    'editor.compositionBorder',
    'editor.findMatchBackground',
    'editor.findMatchHighlightBackground',
    'editor.findRangeHighlightBackground',
    'editor.focusedStackFrameHighlightBackground',
    'editor.foldBackground',
    'editor.foldPlaceholderForeground',
    'editor.foreground',
    'editor.hoverHighlightBackground',
    'editor.inactiveLineHighlightBackground',
    'editor.inactiveSelectionBackground',
    'editor.inlineValuesBackground',
    'editor.inlineValuesForeground',
    'editor.lineHighlightBackground',
    'editor.lineHighlightBorder',
    'editor.linkedEditingBackground',
    'editor.placeholder.foreground',
    'editor.rangeHighlightBackground',
    'editor.selectionBackground',
    'editor.selectionHighlightBackground',
    'editor.snippetFinalTabstopHighlightBorder',
    'editor.snippetTabstopHighlightBackground',
    'editor.stackFrameHighlightBackground',
    'editor.symbolHighlightBackground',
    'editor.wordHighlightBackground',
    'editor.wordHighlightStrongBackground',
    'editor.wordHighlightTextBackground',
    'editorActionList.background',
    'editorActionList.focusBackground',
    'editorActionList.focusForeground',
    'editorActionList.foreground',
    'editorActiveLineNumber.foreground',
    'editorBracketHighlight.foreground1',
    'editorBracketHighlight.foreground2',
    'editorBracketHighlight.foreground3',
    'editorBracketHighlight.foreground4',
    'editorBracketHighlight.foreground5',
    'editorBracketHighlight.foreground6',
    'editorBracketHighlight.unexpectedBracket.foreground',
    'editorBracketMatch.background',
    'editorBracketMatch.border',
    'editorBracketPairGuide.activeBackground1',
    'editorBracketPairGuide.activeBackground2',
    'editorBracketPairGuide.activeBackground3',
    'editorBracketPairGuide.activeBackground4',
    'editorBracketPairGuide.activeBackground5',
    'editorBracketPairGuide.activeBackground6',
    'editorBracketPairGuide.background1',
    'editorBracketPairGuide.background2',
    'editorBracketPairGuide.background3',
    'editorBracketPairGuide.background4',
    'editorBracketPairGuide.background5',
    'editorBracketPairGuide.background6',
    'editorCodeLens.foreground',
    'editorCommentsWidget.rangeActiveBackground',
    'editorCommentsWidget.rangeBackground',
    'editorCommentsWidget.replyInputBackground',
    'editorCommentsWidget.resolvedBorder',
    'editorCommentsWidget.unresolvedBorder',
    'editorCursor.foreground',
    'editorError.foreground',
    'editorGhostText.foreground',
    'editorGroup.border',
    'editorGroup.dropBackground',
    'editorGroup.dropIntoPromptBackground',
    'editorGroup.dropIntoPromptForeground',
    'editorGroupHeader.noTabsBackground',
    'editorGroupHeader.tabsBackground',
    'editorGroupHeader.tabsBorder',
    'editorGutter.addedBackground',
    'editorGutter.addedSecondaryBackground',
    'editorGutter.background',
    'editorGutter.commentDraftGlyphForeground',
    'editorGutter.commentGlyphForeground',
    'editorGutter.commentRangeForeground',
    'editorGutter.commentUnresolvedGlyphForeground',
    'editorGutter.deletedBackground',
    'editorGutter.deletedSecondaryBackground',
    'editorGutter.foldingControlForeground',
    'editorGutter.itemBackground',
    'editorGutter.itemGlyphForeground',
    'editorGutter.modifiedBackground',
    'editorGutter.modifiedSecondaryBackground',
    'editorHint.foreground',
    'editorHoverWidget.background',
    'editorHoverWidget.border',
    'editorHoverWidget.foreground',
    'editorHoverWidget.highlightForeground',
    'editorHoverWidget.statusBarBackground',
    'editorIndentGuide.activeBackground',
    'editorIndentGuide.activeBackground1',
    'editorIndentGuide.activeBackground2',
    'editorIndentGuide.activeBackground3',
    'editorIndentGuide.activeBackground4',
    'editorIndentGuide.activeBackground5',
    'editorIndentGuide.activeBackground6',
    'editorIndentGuide.background',
    'editorIndentGuide.background1',
    'editorIndentGuide.background2',
    'editorIndentGuide.background3',
    'editorIndentGuide.background4',
    'editorIndentGuide.background5',
    'editorIndentGuide.background6',
    'editorInfo.foreground',
    'editorInlayHint.background',
    'editorInlayHint.foreground',
    'editorInlayHint.parameterBackground',
    'editorInlayHint.parameterForeground',
    'editorInlayHint.typeBackground',
    'editorInlayHint.typeForeground',
    'editorLightBulb.foreground',
    'editorLightBulbAi.foreground',
    'editorLightBulbAutoFix.foreground',
    'editorLineNumber.activeForeground',
    'editorLineNumber.foreground',
    'editorLink.activeForeground',
    'editorMarkerNavigation.background',
    'editorMarkerNavigationError.background',
    'editorMarkerNavigationError.headerBackground',
    'editorMarkerNavigationInfo.background',
    'editorMarkerNavigationInfo.headerBackground',
    'editorMarkerNavigationWarning.background',
    'editorMarkerNavigationWarning.headerBackground',
    'editorMinimap.inlineChatInserted',
    'editorMultiCursor.primary.foreground',
    'editorMultiCursor.secondary.foreground',
    'editorOverviewRuler.addedForeground',
    'editorOverviewRuler.border',
    'editorOverviewRuler.bracketMatchForeground',
    'editorOverviewRuler.commentDraftForeground',
    'editorOverviewRuler.commentForeground',
    'editorOverviewRuler.commentUnresolvedForeground',
    'editorOverviewRuler.commonContentForeground',
    'editorOverviewRuler.currentContentForeground',
    'editorOverviewRuler.deletedForeground',
    'editorOverviewRuler.errorForeground',
    'editorOverviewRuler.findMatchForeground',
    'editorOverviewRuler.incomingContentForeground',
    'editorOverviewRuler.infoForeground',
    'editorOverviewRuler.inlineChatInserted',
    'editorOverviewRuler.inlineChatRemoved',
    'editorOverviewRuler.modifiedForeground',
    'editorOverviewRuler.rangeHighlightForeground',
    'editorOverviewRuler.selectionHighlightForeground',
    'editorOverviewRuler.warningForeground',
    'editorOverviewRuler.wordHighlightForeground',
    'editorOverviewRuler.wordHighlightStrongForeground',
    'editorOverviewRuler.wordHighlightTextForeground',
    'editorPane.background',
    'editorRuler.foreground',
    'editorStickyScroll.background',
    'editorStickyScroll.shadow',
    'editorStickyScrollGutter.background',
    'editorStickyScrollHover.background',
    'editorSuggestWidget.background',
    'editorSuggestWidget.border',
    'editorSuggestWidget.focusHighlightForeground',
    'editorSuggestWidget.foreground',
    'editorSuggestWidget.highlightForeground',
    'editorSuggestWidget.selectedBackground',
    'editorSuggestWidget.selectedForeground',
    'editorSuggestWidgetStatus.foreground',
    'editorUnicodeHighlight.border',
    'editorUnnecessaryCode.opacity',
    'editorWarning.foreground',
    'editorWhitespace.foreground',
    'editorWidget.background',
    'editorWidget.border',
    'editorWidget.foreground',
    'editorWordWrapIndicator.foreground',
    'errorForeground',
    'extensionBadge.remoteBackground',
    'extensionBadge.remoteForeground',
    'extensionButton.background',
    'extensionButton.border',
    'extensionButton.foreground',
    'extensionButton.hoverBackground',
    'extensionButton.prominentBackground',
    'extensionButton.prominentForeground',
    'extensionButton.prominentHoverBackground',
    'extensionButton.separator',
    'extensionIcon.preReleaseForeground',
    'extensionIcon.privateForeground',
    'extensionIcon.sponsorForeground',
    'extensionIcon.starForeground',
    'extensionIcon.verifiedForeground',
    'focusBorder',
    'foreground',
    'git.blame.editorDecorationForeground',
    'gitDecoration.addedResourceForeground',
    'gitDecoration.conflictingResourceForeground',
    'gitDecoration.deletedResourceForeground',
    'gitDecoration.ignoredResourceForeground',
    'gitDecoration.modifiedResourceForeground',
    'gitDecoration.renamedResourceForeground',
    'gitDecoration.stageDeletedResourceForeground',
    'gitDecoration.stageModifiedResourceForeground',
    'gitDecoration.submoduleResourceForeground',
    'gitDecoration.untrackedResourceForeground',
    'icon.foreground',
    'inactiveSessionView.background',
    'inactiveSessionView.foreground',
    'inlineChat.background',
    'inlineChat.border',
    'inlineChat.foreground',
    'inlineChat.shadow',
    'inlineChatDiff.inserted',
    'inlineChatDiff.removed',
    'inlineChatInput.background',
    'inlineChatInput.border',
    'inlineChatInput.focusBorder',
    'inlineChatInput.placeholderForeground',
    'inlineEdit.gutterIndicator.background',
    'inlineEdit.gutterIndicator.primaryBackground',
    'inlineEdit.gutterIndicator.primaryBorder',
    'inlineEdit.gutterIndicator.primaryForeground',
    'inlineEdit.gutterIndicator.secondaryBackground',
    'inlineEdit.gutterIndicator.secondaryBorder',
    'inlineEdit.gutterIndicator.secondaryForeground',
    'inlineEdit.gutterIndicator.successfulBackground',
    'inlineEdit.gutterIndicator.successfulBorder',
    'inlineEdit.gutterIndicator.successfulForeground',
    'inlineEdit.modifiedBackground',
    'inlineEdit.modifiedBorder',
    'inlineEdit.modifiedChangedLineBackground',
    'inlineEdit.modifiedChangedTextBackground',
    'inlineEdit.originalBackground',
    'inlineEdit.originalBorder',
    'inlineEdit.originalChangedLineBackground',
    'inlineEdit.originalChangedTextBackground',
    'inlineEdit.tabWillAcceptModifiedBorder',
    'inlineEdit.tabWillAcceptOriginalBorder',
    'input.background',
    'input.border',
    'input.foreground',
    'input.placeholderForeground',
    'inputOption.activeBackground',
    'inputOption.activeBorder',
    'inputOption.activeForeground',
    'inputOption.hoverBackground',
    'inputValidation.errorBackground',
    'inputValidation.errorBorder',
    'inputValidation.infoBackground',
    'inputValidation.infoBorder',
    'inputValidation.warningBackground',
    'inputValidation.warningBorder',
    'interactive.activeCodeBorder',
    'interactive.inactiveCodeBorder',
    'keybindingLabel.background',
    'keybindingLabel.border',
    'keybindingLabel.bottomBorder',
    'keybindingLabel.foreground',
    'keybindingTable.headerBackground',
    'keybindingTable.rowsBackground',
    'list.activeSelectionBackground',
    'list.activeSelectionForeground',
    'list.deemphasizedForeground',
    'list.dropBackground',
    'list.dropBetweenBackground',
    'list.errorForeground',
    'list.filterMatchBackground',
    'list.focusHighlightForeground',
    'list.focusOutline',
    'list.highlightForeground',
    'list.hoverBackground',
    'list.hoverForeground',
    'list.inactiveSelectionBackground',
    'list.inactiveSelectionForeground',
    'list.invalidItemForeground',
    'list.warningForeground',
    'listFilterWidget.background',
    'listFilterWidget.noMatchesOutline',
    'listFilterWidget.outline',
    'listFilterWidget.shadow',
    'markdownAlert.caution.foreground',
    'markdownAlert.important.foreground',
    'markdownAlert.note.foreground',
    'markdownAlert.tip.foreground',
    'markdownAlert.warning.foreground',
    'mcpIcon.starForeground',
    'menu.background',
    'menu.border',
    'menu.foreground',
    'menu.selectionBackground',
    'menu.selectionForeground',
    'menu.separatorBackground',
    'menubar.selectionBackground',
    'menubar.selectionForeground',
    'merge.commonContentBackground',
    'merge.commonHeaderBackground',
    'merge.currentContentBackground',
    'merge.currentHeaderBackground',
    'merge.incomingContentBackground',
    'merge.incomingHeaderBackground',
    'mergeEditor.change.background',
    'mergeEditor.change.word.background',
    'mergeEditor.changeBase.background',
    'mergeEditor.changeBase.word.background',
    'mergeEditor.conflict.handled.minimapOverViewRuler',
    'mergeEditor.conflict.handledFocused.border',
    'mergeEditor.conflict.handledUnfocused.border',
    'mergeEditor.conflict.input1.background',
    'mergeEditor.conflict.input2.background',
    'mergeEditor.conflict.unhandled.minimapOverViewRuler',
    'mergeEditor.conflict.unhandledFocused.border',
    'mergeEditor.conflict.unhandledUnfocused.border',
    'mergeEditor.conflictingLines.background',
    'minimap.chatEditHighlight',
    'minimap.errorHighlight',
    'minimap.findMatchHighlight',
    'minimap.foregroundOpacity',
    'minimap.infoHighlight',
    'minimap.selectionHighlight',
    'minimap.selectionOccurrenceHighlight',
    'minimap.warningHighlight',
    'minimapGutter.addedBackground',
    'minimapGutter.deletedBackground',
    'minimapGutter.modifiedBackground',
    'minimapSlider.activeBackground',
    'minimapSlider.background',
    'minimapSlider.hoverBackground',
    'modernActivityBar.background',
    'modernActivityBar.border',
    'modernActivityBar.inactiveBackground',
    'modernActivityBarItem.activeBackground',
    'modernActivityBarItem.activeForeground',
    'modernActivityBarItem.hoverBackground',
    'modernActivityBarItem.hoverForeground',
    'modernEditorTab.activeActionBackground',
    'modernEditorTab.activeBackground',
    'modernEditorTab.activeForeground',
    'modernEditorTab.activeHoverActionBackground',
    'modernEditorTab.activeHoverBackground',
    'modernEditorTab.hoverActionBackground',
    'modernEditorTab.hoverBackground',
    'modernEditorTab.hoverForeground',
    'modernEditorTab.inactiveBackground',
    'modernEditorTab.selectedActionBackground',
    'modernPanel.border',
    'modernSash.gripForeground',
    'modernTab.activeBackground',
    'modernTab.activeForeground',
    'modernTab.hoverBackground',
    'modernTab.hoverForeground',
    'modernUI.inactiveShellBackground',
    'modernUI.shellBackground',
    'multiDiffEditor.background',
    'multiDiffEditor.border',
    'multiDiffEditor.headerBackground',
    'notebook.cellBorderColor',
    'notebook.cellEditorBackground',
    'notebook.cellInsertionIndicator',
    'notebook.cellStatusBarItemHoverBackground',
    'notebook.cellToolbarSeparator',
    'notebook.editorBackground',
    'notebook.focusedCellBorder',
    'notebook.focusedEditorBorder',
    'notebook.inactiveFocusedCellBorder',
    'notebook.selectedCellBackground',
    'notebook.selectedCellBorder',
    'notebook.symbolHighlightBackground',
    'notebookEditorOverviewRuler.runningCellForeground',
    'notebookScrollbarSlider.activeBackground',
    'notebookScrollbarSlider.background',
    'notebookScrollbarSlider.hoverBackground',
    'notebookStatusErrorIcon.foreground',
    'notebookStatusRunningIcon.foreground',
    'notebookStatusSuccessIcon.foreground',
    'notificationCenter.border',
    'notificationCenterHeader.background',
    'notificationLink.foreground',
    'notificationToast.border',
    'notifications.background',
    'notifications.border',
    'notifications.foreground',
    'notificationsErrorIcon.foreground',
    'notificationsInfoIcon.foreground',
    'notificationsWarningIcon.foreground',
    'panel.background',
    'panel.border',
    'panel.dropBorder',
    'panelInput.border',
    'panelSection.border',
    'panelSection.dropBackground',
    'panelSectionHeader.background',
    'panelStickyScroll.background',
    'panelStickyScroll.shadow',
    'panelTitle.activeBorder',
    'panelTitle.activeForeground',
    'panelTitle.inactiveForeground',
    'panelTitleBadge.background',
    'panelTitleBadge.foreground',
    'peekView.border',
    'peekViewEditor.background',
    'peekViewEditor.matchHighlightBackground',
    'peekViewEditorGutter.background',
    'peekViewEditorStickyScroll.background',
    'peekViewEditorStickyScrollGutter.background',
    'peekViewResult.background',
    'peekViewResult.fileForeground',
    'peekViewResult.lineForeground',
    'peekViewResult.matchHighlightBackground',
    'peekViewResult.selectionBackground',
    'peekViewResult.selectionForeground',
    'peekViewTitle.background',
    'peekViewTitleDescription.foreground',
    'peekViewTitleLabel.foreground',
    'pickerGroup.border',
    'pickerGroup.foreground',
    'ports.iconRunningProcessForeground',
    'problemsErrorIcon.foreground',
    'problemsInfoIcon.foreground',
    'problemsWarningIcon.foreground',
    'profileBadge.background',
    'profileBadge.foreground',
    'profiles.sashBorder',
    'progressBar.background',
    'quickInput.background',
    'quickInput.foreground',
    'quickInputList.focusBackground',
    'quickInputList.focusForeground',
    'quickInputList.focusHighlightForeground',
    'quickInputTitle.background',
    'radio.activeBackground',
    'radio.activeBorder',
    'radio.activeForeground',
    'radio.inactiveBorder',
    'radio.inactiveHoverBackground',
    'sash.hoverBorder',
    'scmGraph.foreground1',
    'scmGraph.foreground2',
    'scmGraph.foreground3',
    'scmGraph.foreground4',
    'scmGraph.foreground5',
    'scmGraph.historyItemBaseRefColor',
    'scmGraph.historyItemHoverAdditionsForeground',
    'scmGraph.historyItemHoverDefaultLabelBackground',
    'scmGraph.historyItemHoverDefaultLabelForeground',
    'scmGraph.historyItemHoverDeletionsForeground',
    'scmGraph.historyItemHoverLabelForeground',
    'scmGraph.historyItemRefColor',
    'scmGraph.historyItemRemoteRefColor',
    'scrollbar.shadow',
    'scrollbarSlider.activeBackground',
    'scrollbarSlider.background',
    'scrollbarSlider.hoverBackground',
    'search.resultsInfoForeground',
    'searchEditor.findMatchBackground',
    'searchEditor.textInputBorder',
    'selection.background',
    'settings.checkboxBackground',
    'settings.checkboxBorder',
    'settings.checkboxForeground',
    'settings.dropdownBackground',
    'settings.dropdownBorder',
    'settings.dropdownForeground',
    'settings.dropdownListBorder',
    'settings.focusedRowBackground',
    'settings.focusedRowBorder',
    'settings.headerBorder',
    'settings.headerForeground',
    'settings.modifiedItemIndicator',
    'settings.numberInputBackground',
    'settings.numberInputBorder',
    'settings.numberInputForeground',
    'settings.rowHoverBackground',
    'settings.sashBorder',
    'settings.settingsHeaderHoverForeground',
    'settings.textInputBackground',
    'settings.textInputBorder',
    'settings.textInputForeground',
    'sideBar.background',
    'sideBar.border',
    'sideBar.dropBackground',
    'sideBar.foreground',
    'sideBarActivityBarTop.border',
    'sideBarSectionHeader.background',
    'sideBarSectionHeader.border',
    'sideBarSectionHeader.foreground',
    'sideBarStickyScroll.background',
    'sideBarStickyScroll.shadow',
    'sideBarTitle.background',
    'sideBarTitle.foreground',
    'sideBySideEditor.horizontalBorder',
    'sideBySideEditor.verticalBorder',
    'simpleFindWidget.sashBorder',
    'statusBar.background',
    'statusBar.border',
    'statusBar.debuggingBackground',
    'statusBar.debuggingBorder',
    'statusBar.debuggingForeground',
    'statusBar.focusBorder',
    'statusBar.foreground',
    'statusBar.noFolderBackground',
    'statusBar.noFolderBorder',
    'statusBar.noFolderForeground',
    'statusBarItem.activeBackground',
    'statusBarItem.compactHoverBackground',
    'statusBarItem.errorBackground',
    'statusBarItem.errorForeground',
    'statusBarItem.errorHoverBackground',
    'statusBarItem.errorHoverForeground',
    'statusBarItem.focusBorder',
    'statusBarItem.hoverBackground',
    'statusBarItem.hoverForeground',
    'statusBarItem.offlineBackground',
    'statusBarItem.offlineForeground',
    'statusBarItem.offlineHoverBackground',
    'statusBarItem.offlineHoverForeground',
    'statusBarItem.prominentBackground',
    'statusBarItem.prominentForeground',
    'statusBarItem.prominentHoverBackground',
    'statusBarItem.prominentHoverForeground',
    'statusBarItem.remoteBackground',
    'statusBarItem.remoteForeground',
    'statusBarItem.remoteHoverBackground',
    'statusBarItem.remoteHoverForeground',
    'statusBarItem.warningBackground',
    'statusBarItem.warningForeground',
    'statusBarItem.warningHoverBackground',
    'statusBarItem.warningHoverForeground',
    'strongForeground',
    'surface.background',
    'surface.border',
    'surface.foreground',
    'symbolIcon.arrayForeground',
    'symbolIcon.booleanForeground',
    'symbolIcon.classForeground',
    'symbolIcon.colorForeground',
    'symbolIcon.constantForeground',
    'symbolIcon.constructorForeground',
    'symbolIcon.enumeratorForeground',
    'symbolIcon.enumeratorMemberForeground',
    'symbolIcon.eventForeground',
    'symbolIcon.fieldForeground',
    'symbolIcon.fileForeground',
    'symbolIcon.folderForeground',
    'symbolIcon.functionForeground',
    'symbolIcon.interfaceForeground',
    'symbolIcon.keyForeground',
    'symbolIcon.keywordForeground',
    'symbolIcon.methodForeground',
    'symbolIcon.moduleForeground',
    'symbolIcon.namespaceForeground',
    'symbolIcon.nullForeground',
    'symbolIcon.numberForeground',
    'symbolIcon.objectForeground',
    'symbolIcon.operatorForeground',
    'symbolIcon.packageForeground',
    'symbolIcon.propertyForeground',
    'symbolIcon.referenceForeground',
    'symbolIcon.snippetForeground',
    'symbolIcon.stringForeground',
    'symbolIcon.structForeground',
    'symbolIcon.textForeground',
    'symbolIcon.typeParameterForeground',
    'symbolIcon.unitForeground',
    'symbolIcon.variableForeground',
    'tab.activeBackground',
    'tab.activeBorderTop',
    'tab.activeForeground',
    'tab.activeModifiedBorder',
    'tab.border',
    'tab.dragAndDropBorder',
    'tab.hoverBackground',
    'tab.inactiveBackground',
    'tab.inactiveForeground',
    'tab.inactiveModifiedBorder',
    'tab.lastPinnedBorder',
    'tab.selectedBackground',
    'tab.selectedBorderTop',
    'tab.selectedForeground',
    'tab.unfocusedActiveBackground',
    'tab.unfocusedActiveBorderTop',
    'tab.unfocusedActiveForeground',
    'tab.unfocusedActiveModifiedBorder',
    'tab.unfocusedHoverBackground',
    'tab.unfocusedInactiveBackground',
    'tab.unfocusedInactiveForeground',
    'tab.unfocusedInactiveModifiedBorder',
    'terminal.ansiBlack',
    'terminal.ansiBlue',
    'terminal.ansiBrightBlack',
    'terminal.ansiBrightBlue',
    'terminal.ansiBrightCyan',
    'terminal.ansiBrightGreen',
    'terminal.ansiBrightMagenta',
    'terminal.ansiBrightRed',
    'terminal.ansiBrightWhite',
    'terminal.ansiBrightYellow',
    'terminal.ansiCyan',
    'terminal.ansiGreen',
    'terminal.ansiMagenta',
    'terminal.ansiRed',
    'terminal.ansiWhite',
    'terminal.ansiYellow',
    'terminal.background',
    'terminal.border',
    'terminal.dropBackground',
    'terminal.findMatchBackground',
    'terminal.findMatchHighlightBackground',
    'terminal.foreground',
    'terminal.hoverHighlightBackground',
    'terminal.inactiveSelectionBackground',
    'terminal.initialHintForeground',
    'terminal.selectionBackground',
    'terminalCommandDecoration.defaultBackground',
    'terminalCommandDecoration.errorBackground',
    'terminalCommandDecoration.successBackground',
    'terminalCommandGuide.foreground',
    'terminalCursor.foreground',
    'terminalOverviewRuler.border',
    'terminalOverviewRuler.cursorForeground',
    'terminalOverviewRuler.findMatchForeground',
    'terminalStickyScrollHover.background',
    'terminalSymbolIcon.aliasForeground',
    'terminalSymbolIcon.argumentForeground',
    'terminalSymbolIcon.branchForeground',
    'terminalSymbolIcon.commitForeground',
    'terminalSymbolIcon.fileForeground',
    'terminalSymbolIcon.flagForeground',
    'terminalSymbolIcon.folderForeground',
    'terminalSymbolIcon.methodForeground',
    'terminalSymbolIcon.optionForeground',
    'terminalSymbolIcon.optionValueForeground',
    'terminalSymbolIcon.pullRequestDoneForeground',
    'terminalSymbolIcon.pullRequestForeground',
    'terminalSymbolIcon.remoteForeground',
    'terminalSymbolIcon.stashForeground',
    'terminalSymbolIcon.symbolText',
    'terminalSymbolIcon.symbolicLinkFileForeground',
    'terminalSymbolIcon.symbolicLinkFolderForeground',
    'terminalSymbolIcon.tagForeground',
    'testing.coverCountBadgeBackground',
    'testing.coverCountBadgeForeground',
    'testing.coveredBackground',
    'testing.coveredBorder',
    'testing.coveredGutterBackground',
    'testing.coveredMinimapBackground',
    'testing.iconErrored',
    'testing.iconErrored.retired',
    'testing.iconFailed',
    'testing.iconFailed.retired',
    'testing.iconPassed',
    'testing.iconPassed.retired',
    'testing.iconQueued',
    'testing.iconQueued.retired',
    'testing.iconSkipped',
    'testing.iconSkipped.retired',
    'testing.iconUnset',
    'testing.iconUnset.retired',
    'testing.message.error.badgeBackground',
    'testing.message.error.badgeBorder',
    'testing.message.error.badgeForeground',
    'testing.message.info.decorationForeground',
    'testing.messagePeekBorder',
    'testing.messagePeekHeaderBackground',
    'testing.peekBorder',
    'testing.peekHeaderBackground',
    'testing.runAction',
    'testing.uncoveredBackground',
    'testing.uncoveredBorder',
    'testing.uncoveredBranchBackground',
    'testing.uncoveredGutterBackground',
    'testing.uncoveredMinimapBackground',
    'textBlockQuote.background',
    'textBlockQuote.border',
    'textCodeBlock.background',
    'textLink.activeForeground',
    'textLink.foreground',
    'textPreformat.background',
    'textPreformat.foreground',
    'textSeparator.foreground',
    'titleBar.activeBackground',
    'titleBar.activeForeground',
    'titleBar.border',
    'titleBar.inactiveBackground',
    'titleBar.inactiveForeground',
    'toolbar.activeBackground',
    'toolbar.hoverBackground',
    'tree.inactiveIndentGuidesStroke',
    'tree.indentGuidesStroke',
    'tree.tableColumnsBorder',
    'tree.tableOddRowsBackground',
    'walkThrough.embeddedEditorBackground',
    'walkthrough.stepTitle.foreground',
    'welcomePage.progress.background',
    'welcomePage.progress.foreground',
    'welcomePage.tileBackground',
    'welcomePage.tileBorder',
    'welcomePage.tileHoverBackground',
    'widget.border',
    'widget.shadow',
] as const;

/** Union of every runtime color ID (e.g. `editor.background`). */
export type VscodeWorkbenchColorId = (typeof VSCODE_WORKBENCH_COLOR_IDS)[number];

/** Resolved color values keyed by theme color ID. All 874 keys are required
 * in a complete snapshot; use `Partial<VscodeWorkbenchColorTokens>` for theme `colors`
 * objects that only set a subset (unset IDs fall back to VSCode defaults). */
export interface VscodeWorkbenchColorTokens {
    /* -- (top-level) (6) -- */
    /** `--vscode-descriptionForeground` - @example `#3e4a3e` */
    'descriptionForeground': string;
    /** `--vscode-disabledForeground` - @example `#6e7a6c` */
    'disabledForeground': string;
    /** `--vscode-errorForeground` - @example `#8e1400` */
    'errorForeground': string;
    /** `--vscode-focusBorder` - @example `#006b2a` */
    'focusBorder': string;
    /** `--vscode-foreground` - @example `#171d17` */
    'foreground': string;
    /** `--vscode-strongForeground` - @example `#000000` */
    'strongForeground': string;
    /* -- actionBar (1) -- */
    /** `--vscode-actionBar-toggledBackground` - @example `rgba(0, 107, 42, 0.2)` */
    'actionBar.toggledBackground': string;
    /* -- activeSessionView (2) -- */
    /** `--vscode-activeSessionView-background` - @example `#f5fbf0` */
    'activeSessionView.background': string;
    /** `--vscode-activeSessionView-foreground` - @example `#171d17` */
    'activeSessionView.foreground': string;
    /* -- activityBar (7) -- */
    /** `--vscode-activityBar-activeBackground` - @example `#006b2a` */
    'activityBar.activeBackground': string;
    /** `--vscode-activityBar-activeBorder` - @example `#006b2a` */
    'activityBar.activeBorder': string;
    /** `--vscode-activityBar-background` - @example `#eff6eb` */
    'activityBar.background': string;
    /** `--vscode-activityBar-border` - @example `#bdcaba` */
    'activityBar.border': string;
    /** `--vscode-activityBar-dropBorder` - @example `#ffffff` */
    'activityBar.dropBorder': string;
    /** `--vscode-activityBar-foreground` - @example `#ffffff` */
    'activityBar.foreground': string;
    /** `--vscode-activityBar-inactiveForeground` - @example `#3e4a3e` */
    'activityBar.inactiveForeground': string;
    /* -- activityBarBadge (2) -- */
    /** `--vscode-activityBarBadge-background` - @example `#008738` */
    'activityBarBadge.background': string;
    /** `--vscode-activityBarBadge-foreground` - @example `#f7fff2` */
    'activityBarBadge.foreground': string;
    /* -- activityBarTop (4) -- */
    /** `--vscode-activityBarTop-activeBorder` - @example `#424242` */
    'activityBarTop.activeBorder': string;
    /** `--vscode-activityBarTop-dropBorder` - @example `#424242` */
    'activityBarTop.dropBorder': string;
    /** `--vscode-activityBarTop-foreground` - @example `#424242` */
    'activityBarTop.foreground': string;
    /** `--vscode-activityBarTop-inactiveForeground` - @example `rgba(66, 66, 66, 0.75)` */
    'activityBarTop.inactiveForeground': string;
    /* -- activityErrorBadge (2) -- */
    /** `--vscode-activityErrorBadge-background` - @example `#e51400` */
    'activityErrorBadge.background': string;
    /** `--vscode-activityErrorBadge-foreground` - @example `#ffffff` */
    'activityErrorBadge.foreground': string;
    /* -- activityWarningBadge (2) -- */
    /** `--vscode-activityWarningBadge-background` - @example `#b27c00` */
    'activityWarningBadge.background': string;
    /** `--vscode-activityWarningBadge-foreground` - @example `#ffffff` */
    'activityWarningBadge.foreground': string;
    /* -- agentFeedbackEditorWidget (2) -- */
    /** `--vscode-agentFeedbackEditorWidget-background` - @example `#e9e9e9` */
    'agentFeedbackEditorWidget.background': string;
    /** `--vscode-agentFeedbackEditorWidget-border` - @example `rgba(23, 29, 23, 0.35)` */
    'agentFeedbackEditorWidget.border': string;
    /* -- agentFeedbackInputWidget (1) -- */
    /** `--vscode-agentFeedbackInputWidget-border` - @example `rgba(23, 29, 23, 0.2)` */
    'agentFeedbackInputWidget.border': string;
    /* -- agentSessionReadIndicator (1) -- */
    /** `--vscode-agentSessionReadIndicator-foreground` - @example `rgba(23, 29, 23, 0.2)` */
    'agentSessionReadIndicator.foreground': string;
    /* -- agentSessionSelectedBadge (1) -- */
    /** `--vscode-agentSessionSelectedBadge-border` - @example `rgba(23, 29, 23, 0.3)` */
    'agentSessionSelectedBadge.border': string;
    /* -- agentSessionSelectedUnfocusedBadge (1) -- */
    /** `--vscode-agentSessionSelectedUnfocusedBadge-border` - @example `rgba(23, 29, 23, 0.3)` */
    'agentSessionSelectedUnfocusedBadge.border': string;
    /* -- agentStatusIndicator (1) -- */
    /** `--vscode-agentStatusIndicator-background` - @example `rgba(0, 0, 0, 0.05)` */
    'agentStatusIndicator.background': string;
    /* -- agents (1) -- */
    /** `--vscode-agents-background` - @example `#f5fbf0` */
    'agents.background': string;
    /* -- agentsBadge (2) -- */
    /** `--vscode-agentsBadge-background` - @example `#008738` */
    'agentsBadge.background': string;
    /** `--vscode-agentsBadge-foreground` - @example `#f7fff2` */
    'agentsBadge.foreground': string;
    /* -- agentsBottomPanel (1) -- */
    /** `--vscode-agentsBottomPanel-border` - @example `rgba(23, 29, 23, 0.15)` */
    'agentsBottomPanel.border': string;
    /* -- agentsCard (1) -- */
    /** `--vscode-agentsCard-border` - @example `rgba(23, 29, 23, 0.15)` */
    'agentsCard.border': string;
    /* -- agentsChatInput (5) -- */
    /** `--vscode-agentsChatInput-background` - @example `#dee4da` */
    'agentsChatInput.background': string;
    /** `--vscode-agentsChatInput-border` - @example `#bdcaba` */
    'agentsChatInput.border': string;
    /** `--vscode-agentsChatInput-focusBorder` - @example `#006b2a` */
    'agentsChatInput.focusBorder': string;
    /** `--vscode-agentsChatInput-foreground` - @example `#171d17` */
    'agentsChatInput.foreground': string;
    /** `--vscode-agentsChatInput-placeholderForeground` - @example `#3e4a3e` */
    'agentsChatInput.placeholderForeground': string;
    /* -- agentsGradient (1) -- */
    /** `--vscode-agentsGradient-tintColor` - @example `#006b2a` */
    'agentsGradient.tintColor': string;
    /* -- agentsNewSessionButton (4) -- */
    /** `--vscode-agentsNewSessionButton-background` - @example `rgba(0, 0, 0, 0)` */
    'agentsNewSessionButton.background': string;
    /** `--vscode-agentsNewSessionButton-border` - @example `rgba(23, 29, 23, 0.15)` */
    'agentsNewSessionButton.border': string;
    /** `--vscode-agentsNewSessionButton-foreground` - @example `#171d17` */
    'agentsNewSessionButton.foreground': string;
    /** `--vscode-agentsNewSessionButton-hoverBackground` - @example `rgba(184, 184, 184, 0.31)` */
    'agentsNewSessionButton.hoverBackground': string;
    /* -- agentsPanel (3) -- */
    /** `--vscode-agentsPanel-background` - @example `#f5fbf0` */
    'agentsPanel.background': string;
    /** `--vscode-agentsPanel-border` - @example `rgba(23, 29, 23, 0.15)` */
    'agentsPanel.border': string;
    /** `--vscode-agentsPanel-foreground` - @example `#171d17` */
    'agentsPanel.foreground': string;
    /* -- agentsUnreadBadge (2) -- */
    /** `--vscode-agentsUnreadBadge-background` - @example `#008738` */
    'agentsUnreadBadge.background': string;
    /** `--vscode-agentsUnreadBadge-foreground` - @example `#f7fff2` */
    'agentsUnreadBadge.foreground': string;
    /* -- agentsUpdateButton (2) -- */
    /** `--vscode-agentsUpdateButton-downloadedBackground` - @example `rgba(0, 107, 42, 0.7)` */
    'agentsUpdateButton.downloadedBackground': string;
    /** `--vscode-agentsUpdateButton-downloadingBackground` - @example `rgba(0, 107, 42, 0.4)` */
    'agentsUpdateButton.downloadingBackground': string;
    /* -- agentsVoice (2) -- */
    /** `--vscode-agentsVoice-speakingBackground` - @example `rgba(130, 80, 223, 0.08)` */
    'agentsVoice.speakingBackground': string;
    /** `--vscode-agentsVoice-speakingForeground` - @example `#8250df` */
    'agentsVoice.speakingForeground': string;
    /* -- badge (2) -- */
    /** `--vscode-badge-background` - @example `#006b2a` */
    'badge.background': string;
    /** `--vscode-badge-foreground` - @example `#ffffff` */
    'badge.foreground': string;
    /* -- banner (3) -- */
    /** `--vscode-banner-background` - @example `#99ac8d` */
    'banner.background': string;
    /** `--vscode-banner-foreground` - @example `#171d17` */
    'banner.foreground': string;
    /** `--vscode-banner-iconForeground` - @example `#004c6d` */
    'banner.iconForeground': string;
    /* -- breadcrumb (4) -- */
    /** `--vscode-breadcrumb-activeSelectionForeground` - @example `#131713` */
    'breadcrumb.activeSelectionForeground': string;
    /** `--vscode-breadcrumb-background` - @example `#f5fbf0` */
    'breadcrumb.background': string;
    /** `--vscode-breadcrumb-focusForeground` - @example `#131713` */
    'breadcrumb.focusForeground': string;
    /** `--vscode-breadcrumb-foreground` - @example `rgba(23, 29, 23, 0.8)` */
    'breadcrumb.foreground': string;
    /* -- breadcrumbPicker (1) -- */
    /** `--vscode-breadcrumbPicker-background` - @example `#f3f3f3` */
    'breadcrumbPicker.background': string;
    /* -- browser (1) -- */
    /** `--vscode-browser-border` - @example `#bdcaba` */
    'browser.border': string;
    /* -- button (9) -- */
    /** `--vscode-button-background` - @example `#006b2a` */
    'button.background': string;
    /** `--vscode-button-border` - @example `#bdcaba` */
    'button.border': string;
    /** `--vscode-button-foreground` - @example `#ffffff` */
    'button.foreground': string;
    /** `--vscode-button-hoverBackground` - @example `#006b2a` */
    'button.hoverBackground': string;
    /** `--vscode-button-secondaryBackground` - @example `#dee4da` */
    'button.secondaryBackground': string;
    /** `--vscode-button-secondaryBorder` - @example `rgba(23, 29, 23, 0.15)` */
    'button.secondaryBorder': string;
    /** `--vscode-button-secondaryForeground` - @example `#171d17` */
    'button.secondaryForeground': string;
    /** `--vscode-button-secondaryHoverBackground` - @example `#dee4da` */
    'button.secondaryHoverBackground': string;
    /** `--vscode-button-separator` - @example `#bdcaba` */
    'button.separator': string;
    /* -- chart (3) -- */
    /** `--vscode-chart-axis` - @example `rgba(0, 0, 0, 0.6)` */
    'chart.axis': string;
    /** `--vscode-chart-guide` - @example `rgba(0, 0, 0, 0.2)` */
    'chart.guide': string;
    /** `--vscode-chart-line` - @example `#236b8e` */
    'chart.line': string;
    /* -- charts (8) -- */
    /** `--vscode-charts-blue` - @example `#004c6d` */
    'charts.blue': string;
    /** `--vscode-charts-foreground` - @example `#171d17` */
    'charts.foreground': string;
    /** `--vscode-charts-green` - @example `#388a34` */
    'charts.green': string;
    /** `--vscode-charts-lines` - @example `rgba(23, 29, 23, 0.5)` */
    'charts.lines': string;
    /** `--vscode-charts-orange` - @example `rgba(192, 238, 192, 0.4)` */
    'charts.orange': string;
    /** `--vscode-charts-purple` - @example `#652d90` */
    'charts.purple': string;
    /** `--vscode-charts-red` - @example `#8e1400` */
    'charts.red': string;
    /** `--vscode-charts-yellow` - @example `#6c3a00` */
    'charts.yellow': string;
    /* -- chat (27) -- */
    /** `--vscode-chat-avatarBackground` - @example `#f2f2f2` */
    'chat.avatarBackground': string;
    /** `--vscode-chat-avatarForeground` - @example `#171d17` */
    'chat.avatarForeground': string;
    /** `--vscode-chat-checkpointSeparator` - @example `#a9a9a9` */
    'chat.checkpointSeparator': string;
    /** `--vscode-chat-dictationActiveMicGlow` - @example `#006b2a` */
    'chat.dictationActiveMicGlow': string;
    /** `--vscode-chat-editedFileForeground` - @example `#895503` */
    'chat.editedFileForeground': string;
    /** `--vscode-chat-findMatchBackground` - @example `rgba(192, 238, 192, 0.8)` */
    'chat.findMatchBackground': string;
    /** `--vscode-chat-findMatchHighlightBackground` - @example `rgba(192, 238, 192, 0.4)` */
    'chat.findMatchHighlightBackground': string;
    /** `--vscode-chat-inputWorkingBorderColor1` - @example `#006b2a` */
    'chat.inputWorkingBorderColor1': string;
    /** `--vscode-chat-inputWorkingBorderColor2` - @example `#004b1e` */
    'chat.inputWorkingBorderColor2': string;
    /** `--vscode-chat-inputWorkingBorderColor3` - @example `#008b38` */
    'chat.inputWorkingBorderColor3': string;
    /** `--vscode-chat-linesAddedForeground` - @example `#107c10` */
    'chat.linesAddedForeground': string;
    /** `--vscode-chat-linesRemovedForeground` - @example `#bc2f32` */
    'chat.linesRemovedForeground': string;
    /** `--vscode-chat-requestBackground` - @example `rgba(245, 251, 240, 0.62)` */
    'chat.requestBackground': string;
    /** `--vscode-chat-requestBorder` - @example `rgba(0, 0, 0, 0.1)` */
    'chat.requestBorder': string;
    /** `--vscode-chat-requestBubbleBackground` - @example `rgba(222, 228, 218, 0.3)` */
    'chat.requestBubbleBackground': string;
    /** `--vscode-chat-requestBubbleHoverBackground` - @example `rgba(222, 228, 218, 0.6)` */
    'chat.requestBubbleHoverBackground': string;
    /** `--vscode-chat-requestCodeBorder` - @example `rgba(14, 99, 156, 0.25)` */
    'chat.requestCodeBorder': string;
    /** `--vscode-chat-sessionStateIndicator-inProgressBorder` - @example `#6c3a00` */
    'chat.sessionStateIndicator.inProgressBorder': string;
    /** `--vscode-chat-sessionStateIndicator-needsInputBorder` - @example `#8e1400` */
    'chat.sessionStateIndicator.needsInputBorder': string;
    /** `--vscode-chat-sessionStateIndicator-unvisitedBorder` - @example `#388a34` */
    'chat.sessionStateIndicator.unvisitedBorder': string;
    /** `--vscode-chat-slashCommandBackground` - @example `rgba(173, 206, 255, 0.48)` */
    'chat.slashCommandBackground': string;
    /** `--vscode-chat-slashCommandForeground` - @example `#26569e` */
    'chat.slashCommandForeground': string;
    /** `--vscode-chat-statusBackground` - @example `rgba(23, 29, 23, 0.08)` */
    'chat.statusBackground': string;
    /** `--vscode-chat-thinkingShimmer` - @example `#000000` */
    'chat.thinkingShimmer': string;
    /** `--vscode-chat-voiceGlowBaseColor` - @example `#006b2a` */
    'chat.voiceGlowBaseColor': string;
    /** `--vscode-chat-workingProgressInsidersIconForeground` - @example `#24bfa5` */
    'chat.workingProgressInsidersIconForeground': string;
    /** `--vscode-chat-workingProgressStableIconForeground` - @example `#007acc` */
    'chat.workingProgressStableIconForeground': string;
    /* -- checkbox (7) -- */
    /** `--vscode-checkbox-background` - @example `#dee4da` */
    'checkbox.background': string;
    /** `--vscode-checkbox-border` - @example `#6e7a6c` */
    'checkbox.border': string;
    /** `--vscode-checkbox-disabled-background` - @example `#9ca299` */
    'checkbox.disabled.background': string;
    /** `--vscode-checkbox-disabled-foreground` - @example `#585e57` */
    'checkbox.disabled.foreground': string;
    /** `--vscode-checkbox-foreground` - @example `#171d17` */
    'checkbox.foreground': string;
    /** `--vscode-checkbox-selectBackground` - @example `#f3f3f3` */
    'checkbox.selectBackground': string;
    /** `--vscode-checkbox-selectBorder` - @example `#171d17` */
    'checkbox.selectBorder': string;
    /* -- commandCenter (9) -- */
    /** `--vscode-commandCenter-activeBackground` - @example `rgba(0, 0, 0, 0.08)` */
    'commandCenter.activeBackground': string;
    /** `--vscode-commandCenter-activeBorder` - @example `rgba(23, 29, 23, 0.3)` */
    'commandCenter.activeBorder': string;
    /** `--vscode-commandCenter-activeForeground` - @example `#171d17` */
    'commandCenter.activeForeground': string;
    /** `--vscode-commandCenter-background` - @example `rgba(0, 0, 0, 0.05)` */
    'commandCenter.background': string;
    /** `--vscode-commandCenter-border` - @example `rgba(23, 29, 23, 0.2)` */
    'commandCenter.border': string;
    /** `--vscode-commandCenter-debuggingBackground` - @example `rgba(186, 26, 26, 0.26)` */
    'commandCenter.debuggingBackground': string;
    /** `--vscode-commandCenter-foreground` - @example `#171d17` */
    'commandCenter.foreground': string;
    /** `--vscode-commandCenter-inactiveBorder` - @example `rgba(62, 74, 62, 0.25)` */
    'commandCenter.inactiveBorder': string;
    /** `--vscode-commandCenter-inactiveForeground` - @example `#3e4a3e` */
    'commandCenter.inactiveForeground': string;
    /* -- commentsView (2) -- */
    /** `--vscode-commentsView-resolvedIcon` - @example `#6e7a6c` */
    'commentsView.resolvedIcon': string;
    /** `--vscode-commentsView-unresolvedIcon` - @example `#006b2a` */
    'commentsView.unresolvedIcon': string;
    /* -- debugConsole (4) -- */
    /** `--vscode-debugConsole-errorForeground` - @example `#8e1400` */
    'debugConsole.errorForeground': string;
    /** `--vscode-debugConsole-infoForeground` - @example `#004c6d` */
    'debugConsole.infoForeground': string;
    /** `--vscode-debugConsole-sourceForeground` - @example `#171d17` */
    'debugConsole.sourceForeground': string;
    /** `--vscode-debugConsole-warningForeground` - @example `#6c3a00` */
    'debugConsole.warningForeground': string;
    /* -- debugConsoleInputIcon (1) -- */
    /** `--vscode-debugConsoleInputIcon-foreground` - @example `#171d17` */
    'debugConsoleInputIcon.foreground': string;
    /* -- debugExceptionWidget (2) -- */
    /** `--vscode-debugExceptionWidget-background` - @example `#f1dfde` */
    'debugExceptionWidget.background': string;
    /** `--vscode-debugExceptionWidget-border` - @example `#a31515` */
    'debugExceptionWidget.border': string;
    /* -- debugIcon (15) -- */
    /** `--vscode-debugIcon-breakpointCurrentStackframeForeground` - @example `#be8700` */
    'debugIcon.breakpointCurrentStackframeForeground': string;
    /** `--vscode-debugIcon-breakpointDisabledForeground` - @example `#848484` */
    'debugIcon.breakpointDisabledForeground': string;
    /** `--vscode-debugIcon-breakpointForeground` - @example `#e51400` */
    'debugIcon.breakpointForeground': string;
    /** `--vscode-debugIcon-breakpointStackframeForeground` - @example `#89d185` */
    'debugIcon.breakpointStackframeForeground': string;
    /** `--vscode-debugIcon-breakpointUnverifiedForeground` - @example `#848484` */
    'debugIcon.breakpointUnverifiedForeground': string;
    /** `--vscode-debugIcon-continueForeground` - @example `#007acc` */
    'debugIcon.continueForeground': string;
    /** `--vscode-debugIcon-disconnectForeground` - @example `#a1260d` */
    'debugIcon.disconnectForeground': string;
    /** `--vscode-debugIcon-pauseForeground` - @example `#007acc` */
    'debugIcon.pauseForeground': string;
    /** `--vscode-debugIcon-restartForeground` - @example `#388a34` */
    'debugIcon.restartForeground': string;
    /** `--vscode-debugIcon-startForeground` - @example `#388a34` */
    'debugIcon.startForeground': string;
    /** `--vscode-debugIcon-stepBackForeground` - @example `#007acc` */
    'debugIcon.stepBackForeground': string;
    /** `--vscode-debugIcon-stepIntoForeground` - @example `#007acc` */
    'debugIcon.stepIntoForeground': string;
    /** `--vscode-debugIcon-stepOutForeground` - @example `#007acc` */
    'debugIcon.stepOutForeground': string;
    /** `--vscode-debugIcon-stepOverForeground` - @example `#007acc` */
    'debugIcon.stepOverForeground': string;
    /** `--vscode-debugIcon-stopForeground` - @example `#a1260d` */
    'debugIcon.stopForeground': string;
    /* -- debugTokenExpression (7) -- */
    /** `--vscode-debugTokenExpression-boolean` - @example `#0000ff` */
    'debugTokenExpression.boolean': string;
    /** `--vscode-debugTokenExpression-error` - @example `#e51400` */
    'debugTokenExpression.error': string;
    /** `--vscode-debugTokenExpression-name` - @example `#9b46b0` */
    'debugTokenExpression.name': string;
    /** `--vscode-debugTokenExpression-number` - @example `#098658` */
    'debugTokenExpression.number': string;
    /** `--vscode-debugTokenExpression-string` - @example `#a31515` */
    'debugTokenExpression.string': string;
    /** `--vscode-debugTokenExpression-type` - @example `#4a90e2` */
    'debugTokenExpression.type': string;
    /** `--vscode-debugTokenExpression-value` - @example `rgba(108, 108, 108, 0.8)` */
    'debugTokenExpression.value': string;
    /* -- debugToolBar (1) -- */
    /** `--vscode-debugToolBar-background` - @example `#f3f3f3` */
    'debugToolBar.background': string;
    /* -- debugView (5) -- */
    /** `--vscode-debugView-exceptionLabelBackground` - @example `#a31515` */
    'debugView.exceptionLabelBackground': string;
    /** `--vscode-debugView-exceptionLabelForeground` - @example `#ffffff` */
    'debugView.exceptionLabelForeground': string;
    /** `--vscode-debugView-stateLabelBackground` - @example `rgba(136, 136, 136, 0.27)` */
    'debugView.stateLabelBackground': string;
    /** `--vscode-debugView-stateLabelForeground` - @example `#171d17` */
    'debugView.stateLabelForeground': string;
    /** `--vscode-debugView-valueChangedHighlight` - @example `#569cd6` */
    'debugView.valueChangedHighlight': string;
    /* -- diffEditor (11) -- */
    /** `--vscode-diffEditor-diagonalFill` - @example `rgba(34, 34, 34, 0.2)` */
    'diffEditor.diagonalFill': string;
    /** `--vscode-diffEditor-insertedLineBackground` - @example `rgba(104, 255, 137, 0.4)` */
    'diffEditor.insertedLineBackground': string;
    /** `--vscode-diffEditor-insertedTextBackground` - @example `rgba(104, 255, 137, 0.6)` */
    'diffEditor.insertedTextBackground': string;
    /** `--vscode-diffEditor-move-border` - @example `rgba(139, 139, 139, 0.61)` */
    'diffEditor.move.border': string;
    /** `--vscode-diffEditor-moveActive-border` - @example `#ffa500` */
    'diffEditor.moveActive.border': string;
    /** `--vscode-diffEditor-removedLineBackground` - @example `rgba(255, 218, 211, 0.4)` */
    'diffEditor.removedLineBackground': string;
    /** `--vscode-diffEditor-removedTextBackground` - @example `rgba(255, 218, 211, 0.6)` */
    'diffEditor.removedTextBackground': string;
    /** `--vscode-diffEditor-unchangedCodeBackground` - @example `rgba(184, 184, 184, 0.16)` */
    'diffEditor.unchangedCodeBackground': string;
    /** `--vscode-diffEditor-unchangedRegionBackground` - @example `#f5fbf0` */
    'diffEditor.unchangedRegionBackground': string;
    /** `--vscode-diffEditor-unchangedRegionForeground` - @example `#171d17` */
    'diffEditor.unchangedRegionForeground': string;
    /** `--vscode-diffEditor-unchangedRegionShadow` - @example `rgba(115, 115, 115, 0.75)` */
    'diffEditor.unchangedRegionShadow': string;
    /* -- dropdown (4) -- */
    /** `--vscode-dropdown-background` - @example `#dee4da` */
    'dropdown.background': string;
    /** `--vscode-dropdown-border` - @example `#bdcaba` */
    'dropdown.border': string;
    /** `--vscode-dropdown-foreground` - @example `#171d17` */
    'dropdown.foreground': string;
    /** `--vscode-dropdown-listBackground` - @example `#f5fbf0` */
    'dropdown.listBackground': string;
    /* -- editor (29) -- */
    /** `--vscode-editor-background` - @example `#f5fbf0` */
    'editor.background': string;
    /** `--vscode-editor-border` - @example `#d3d9cf` */
    'editor.border': string;
    /** `--vscode-editor-compositionBorder` - @example `#000000` */
    'editor.compositionBorder': string;
    /** `--vscode-editor-findMatchBackground` - @example `rgba(0, 107, 42, 0.4)` */
    'editor.findMatchBackground': string;
    /** `--vscode-editor-findMatchHighlightBackground` - @example `rgba(192, 238, 192, 0.4)` */
    'editor.findMatchHighlightBackground': string;
    /** `--vscode-editor-findRangeHighlightBackground` - @example `rgba(180, 180, 180, 0.3)` */
    'editor.findRangeHighlightBackground': string;
    /** `--vscode-editor-focusedStackFrameHighlightBackground` - @example `rgba(206, 231, 206, 0.45)` */
    'editor.focusedStackFrameHighlightBackground': string;
    /** `--vscode-editor-foldBackground` - @example `rgba(222, 228, 218, 0.3)` */
    'editor.foldBackground': string;
    /** `--vscode-editor-foldPlaceholderForeground` - @example `#808080` */
    'editor.foldPlaceholderForeground': string;
    /** `--vscode-editor-foreground` - @example `#171d17` */
    'editor.foreground': string;
    /** `--vscode-editor-hoverHighlightBackground` - @example `rgba(192, 238, 192, 0.4)` */
    'editor.hoverHighlightBackground': string;
    /** `--vscode-editor-inactiveLineHighlightBackground` - @example `#e9f0e5` */
    'editor.inactiveLineHighlightBackground': string;
    /** `--vscode-editor-inactiveSelectionBackground` - @example `#e4eadf` */
    'editor.inactiveSelectionBackground': string;
    /** `--vscode-editor-inlineValuesBackground` - @example `rgba(255, 200, 0, 0.2)` */
    'editor.inlineValuesBackground': string;
    /** `--vscode-editor-inlineValuesForeground` - @example `rgba(0, 0, 0, 0.5)` */
    'editor.inlineValuesForeground': string;
    /** `--vscode-editor-lineHighlightBackground` - @example `#e9f0e5` */
    'editor.lineHighlightBackground': string;
    /** `--vscode-editor-lineHighlightBorder` - @example `#eeeeee` */
    'editor.lineHighlightBorder': string;
    /** `--vscode-editor-linkedEditingBackground` - @example `rgba(255, 0, 0, 0.3)` */
    'editor.linkedEditingBackground': string;
    /** `--vscode-editor-placeholder-foreground` - @example `rgba(0, 0, 0, 0.47)` */
    'editor.placeholder.foreground': string;
    /** `--vscode-editor-rangeHighlightBackground` - @example `rgba(192, 238, 192, 0.4)` */
    'editor.rangeHighlightBackground': string;
    /** `--vscode-editor-selectionBackground` - @example `#dee4da` */
    'editor.selectionBackground': string;
    /** `--vscode-editor-selectionHighlightBackground` - @example `rgba(236, 239, 233, 0.6)` */
    'editor.selectionHighlightBackground': string;
    /** `--vscode-editor-snippetFinalTabstopHighlightBorder` - @example `rgba(10, 50, 100, 0.5)` */
    'editor.snippetFinalTabstopHighlightBorder': string;
    /** `--vscode-editor-snippetTabstopHighlightBackground` - @example `rgba(10, 50, 100, 0.2)` */
    'editor.snippetTabstopHighlightBackground': string;
    /** `--vscode-editor-stackFrameHighlightBackground` - @example `rgba(255, 255, 102, 0.45)` */
    'editor.stackFrameHighlightBackground': string;
    /** `--vscode-editor-symbolHighlightBackground` - @example `rgba(192, 238, 192, 0.4)` */
    'editor.symbolHighlightBackground': string;
    /** `--vscode-editor-wordHighlightBackground` - @example `rgba(87, 87, 87, 0.25)` */
    'editor.wordHighlightBackground': string;
    /** `--vscode-editor-wordHighlightStrongBackground` - @example `rgba(14, 99, 156, 0.25)` */
    'editor.wordHighlightStrongBackground': string;
    /** `--vscode-editor-wordHighlightTextBackground` - @example `rgba(87, 87, 87, 0.25)` */
    'editor.wordHighlightTextBackground': string;
    /* -- editorActionList (4) -- */
    /** `--vscode-editorActionList-background` - @example `#f3f3f3` */
    'editorActionList.background': string;
    /** `--vscode-editorActionList-focusBackground` - @example `#dee4da` */
    'editorActionList.focusBackground': string;
    /** `--vscode-editorActionList-focusForeground` - @example `#171d17` */
    'editorActionList.focusForeground': string;
    /** `--vscode-editorActionList-foreground` - @example `#171d17` */
    'editorActionList.foreground': string;
    /* -- editorActiveLineNumber (1) -- */
    /** `--vscode-editorActiveLineNumber-foreground` - @example `#0b216f` */
    'editorActiveLineNumber.foreground': string;
    /* -- editorBracketHighlight (7) -- */
    /** `--vscode-editorBracketHighlight-foreground1` - @example `#0431fa` */
    'editorBracketHighlight.foreground1': string;
    /** `--vscode-editorBracketHighlight-foreground2` - @example `#319331` */
    'editorBracketHighlight.foreground2': string;
    /** `--vscode-editorBracketHighlight-foreground3` - @example `#7b3814` */
    'editorBracketHighlight.foreground3': string;
    /** `--vscode-editorBracketHighlight-foreground4` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketHighlight.foreground4': string;
    /** `--vscode-editorBracketHighlight-foreground5` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketHighlight.foreground5': string;
    /** `--vscode-editorBracketHighlight-foreground6` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketHighlight.foreground6': string;
    /** `--vscode-editorBracketHighlight-unexpectedBracket-foreground` - @example `rgba(255, 18, 18, 0.8)` */
    'editorBracketHighlight.unexpectedBracket.foreground': string;
    /* -- editorBracketMatch (2) -- */
    /** `--vscode-editorBracketMatch-background` - @example `rgba(192, 238, 192, 0.4)` */
    'editorBracketMatch.background': string;
    /** `--vscode-editorBracketMatch-border` - @example `#6e7a6c` */
    'editorBracketMatch.border': string;
    /* -- editorBracketPairGuide (12) -- */
    /** `--vscode-editorBracketPairGuide-activeBackground1` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.activeBackground1': string;
    /** `--vscode-editorBracketPairGuide-activeBackground2` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.activeBackground2': string;
    /** `--vscode-editorBracketPairGuide-activeBackground3` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.activeBackground3': string;
    /** `--vscode-editorBracketPairGuide-activeBackground4` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.activeBackground4': string;
    /** `--vscode-editorBracketPairGuide-activeBackground5` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.activeBackground5': string;
    /** `--vscode-editorBracketPairGuide-activeBackground6` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.activeBackground6': string;
    /** `--vscode-editorBracketPairGuide-background1` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.background1': string;
    /** `--vscode-editorBracketPairGuide-background2` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.background2': string;
    /** `--vscode-editorBracketPairGuide-background3` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.background3': string;
    /** `--vscode-editorBracketPairGuide-background4` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.background4': string;
    /** `--vscode-editorBracketPairGuide-background5` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.background5': string;
    /** `--vscode-editorBracketPairGuide-background6` - @example `rgba(0, 0, 0, 0)` */
    'editorBracketPairGuide.background6': string;
    /* -- editorCodeLens (1) -- */
    /** `--vscode-editorCodeLens-foreground` - @example `#919191` */
    'editorCodeLens.foreground': string;
    /* -- editorCommentsWidget (5) -- */
    /** `--vscode-editorCommentsWidget-rangeActiveBackground` - @example `rgba(0, 107, 42, 0.1)` */
    'editorCommentsWidget.rangeActiveBackground': string;
    /** `--vscode-editorCommentsWidget-rangeBackground` - @example `rgba(0, 107, 42, 0.1)` */
    'editorCommentsWidget.rangeBackground': string;
    /** `--vscode-editorCommentsWidget-replyInputBackground` - @example `#f3f3f3` */
    'editorCommentsWidget.replyInputBackground': string;
    /** `--vscode-editorCommentsWidget-resolvedBorder` - @example `#6e7a6c` */
    'editorCommentsWidget.resolvedBorder': string;
    /** `--vscode-editorCommentsWidget-unresolvedBorder` - @example `#006b2a` */
    'editorCommentsWidget.unresolvedBorder': string;
    /* -- editorCursor (1) -- */
    /** `--vscode-editorCursor-foreground` - @example `#006b2a` */
    'editorCursor.foreground': string;
    /* -- editorError (1) -- */
    /** `--vscode-editorError-foreground` - @example `#8e1400` */
    'editorError.foreground': string;
    /* -- editorGhostText (1) -- */
    /** `--vscode-editorGhostText-foreground` - @example `rgba(0, 0, 0, 0.47)` */
    'editorGhostText.foreground': string;
    /* -- editorGroup (4) -- */
    /** `--vscode-editorGroup-border` - @example `#bdcaba` */
    'editorGroup.border': string;
    /** `--vscode-editorGroup-dropBackground` - @example `rgba(0, 107, 42, 0.4)` */
    'editorGroup.dropBackground': string;
    /** `--vscode-editorGroup-dropIntoPromptBackground` - @example `#f3f3f3` */
    'editorGroup.dropIntoPromptBackground': string;
    /** `--vscode-editorGroup-dropIntoPromptForeground` - @example `#171d17` */
    'editorGroup.dropIntoPromptForeground': string;
    /* -- editorGroupHeader (3) -- */
    /** `--vscode-editorGroupHeader-noTabsBackground` - @example `#f5fbf0` */
    'editorGroupHeader.noTabsBackground': string;
    /** `--vscode-editorGroupHeader-tabsBackground` - @example `#e9f0e5` */
    'editorGroupHeader.tabsBackground': string;
    /** `--vscode-editorGroupHeader-tabsBorder` - @example `#bdcaba` */
    'editorGroupHeader.tabsBorder': string;
    /* -- editorGutter (14) -- */
    /** `--vscode-editorGutter-addedBackground` - @example `#00531f` */
    'editorGutter.addedBackground': string;
    /** `--vscode-editorGutter-addedSecondaryBackground` - @example `rgba(0, 83, 31, 0.6)` */
    'editorGutter.addedSecondaryBackground': string;
    /** `--vscode-editorGutter-background` - @example `#f5fbf0` */
    'editorGutter.background': string;
    /** `--vscode-editorGutter-commentDraftGlyphForeground` - @example `#171d17` */
    'editorGutter.commentDraftGlyphForeground': string;
    /** `--vscode-editorGutter-commentGlyphForeground` - @example `#171d17` */
    'editorGutter.commentGlyphForeground': string;
    /** `--vscode-editorGutter-commentRangeForeground` - @example `#d8e1d1` */
    'editorGutter.commentRangeForeground': string;
    /** `--vscode-editorGutter-commentUnresolvedGlyphForeground` - @example `#171d17` */
    'editorGutter.commentUnresolvedGlyphForeground': string;
    /** `--vscode-editorGutter-deletedBackground` - @example `#8e1400` */
    'editorGutter.deletedBackground': string;
    /** `--vscode-editorGutter-deletedSecondaryBackground` - @example `rgba(142, 20, 0, 0.6)` */
    'editorGutter.deletedSecondaryBackground': string;
    /** `--vscode-editorGutter-foldingControlForeground` - @example `#171d17` */
    'editorGutter.foldingControlForeground': string;
    /** `--vscode-editorGutter-itemBackground` - @example `#d8e1d1` */
    'editorGutter.itemBackground': string;
    /** `--vscode-editorGutter-itemGlyphForeground` - @example `#171d17` */
    'editorGutter.itemGlyphForeground': string;
    /** `--vscode-editorGutter-modifiedBackground` - @example `#004c6d` */
    'editorGutter.modifiedBackground': string;
    /** `--vscode-editorGutter-modifiedSecondaryBackground` - @example `rgba(0, 76, 109, 0.6)` */
    'editorGutter.modifiedSecondaryBackground': string;
    /* -- editorHint (1) -- */
    /** `--vscode-editorHint-foreground` - @example `#6c6c6c` */
    'editorHint.foreground': string;
    /* -- editorHoverWidget (5) -- */
    /** `--vscode-editorHoverWidget-background` - @example `#f3f3f3` */
    'editorHoverWidget.background': string;
    /** `--vscode-editorHoverWidget-border` - @example `rgba(23, 29, 23, 0.2)` */
    'editorHoverWidget.border': string;
    /** `--vscode-editorHoverWidget-foreground` - @example `#171d17` */
    'editorHoverWidget.foreground': string;
    /** `--vscode-editorHoverWidget-highlightForeground` - @example `#006b2a` */
    'editorHoverWidget.highlightForeground': string;
    /** `--vscode-editorHoverWidget-statusBarBackground` - @example `#e7e7e7` */
    'editorHoverWidget.statusBarBackground': string;
    /* -- editorIndentGuide (14) -- */
    /** `--vscode-editorIndentGuide-activeBackground` - @example `#6e7a6c` */
    'editorIndentGuide.activeBackground': string;
    /** `--vscode-editorIndentGuide-activeBackground1` - @example `#6e7a6c` */
    'editorIndentGuide.activeBackground1': string;
    /** `--vscode-editorIndentGuide-activeBackground2` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.activeBackground2': string;
    /** `--vscode-editorIndentGuide-activeBackground3` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.activeBackground3': string;
    /** `--vscode-editorIndentGuide-activeBackground4` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.activeBackground4': string;
    /** `--vscode-editorIndentGuide-activeBackground5` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.activeBackground5': string;
    /** `--vscode-editorIndentGuide-activeBackground6` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.activeBackground6': string;
    /** `--vscode-editorIndentGuide-background` - @example `#bdcaba` */
    'editorIndentGuide.background': string;
    /** `--vscode-editorIndentGuide-background1` - @example `#bdcaba` */
    'editorIndentGuide.background1': string;
    /** `--vscode-editorIndentGuide-background2` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.background2': string;
    /** `--vscode-editorIndentGuide-background3` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.background3': string;
    /** `--vscode-editorIndentGuide-background4` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.background4': string;
    /** `--vscode-editorIndentGuide-background5` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.background5': string;
    /** `--vscode-editorIndentGuide-background6` - @example `rgba(0, 0, 0, 0)` */
    'editorIndentGuide.background6': string;
    /* -- editorInfo (1) -- */
    /** `--vscode-editorInfo-foreground` - @example `#004c6d` */
    'editorInfo.foreground': string;
    /* -- editorInlayHint (6) -- */
    /** `--vscode-editorInlayHint-background` - @example `rgba(0, 107, 42, 0.1)` */
    'editorInlayHint.background': string;
    /** `--vscode-editorInlayHint-foreground` - @example `#969696` */
    'editorInlayHint.foreground': string;
    /** `--vscode-editorInlayHint-parameterBackground` - @example `rgba(0, 107, 42, 0.1)` */
    'editorInlayHint.parameterBackground': string;
    /** `--vscode-editorInlayHint-parameterForeground` - @example `#969696` */
    'editorInlayHint.parameterForeground': string;
    /** `--vscode-editorInlayHint-typeBackground` - @example `rgba(0, 107, 42, 0.1)` */
    'editorInlayHint.typeBackground': string;
    /** `--vscode-editorInlayHint-typeForeground` - @example `#969696` */
    'editorInlayHint.typeForeground': string;
    /* -- editorLightBulb (1) -- */
    /** `--vscode-editorLightBulb-foreground` - @example `#ddb100` */
    'editorLightBulb.foreground': string;
    /* -- editorLightBulbAi (1) -- */
    /** `--vscode-editorLightBulbAi-foreground` - @example `#ddb100` */
    'editorLightBulbAi.foreground': string;
    /* -- editorLightBulbAutoFix (1) -- */
    /** `--vscode-editorLightBulbAutoFix-foreground` - @example `#007acc` */
    'editorLightBulbAutoFix.foreground': string;
    /* -- editorLineNumber (2) -- */
    /** `--vscode-editorLineNumber-activeForeground` - @example `#171d17` */
    'editorLineNumber.activeForeground': string;
    /** `--vscode-editorLineNumber-foreground` - @example `#6e7a6c` */
    'editorLineNumber.foreground': string;
    /* -- editorLink (1) -- */
    /** `--vscode-editorLink-activeForeground` - @example `#0000ff` */
    'editorLink.activeForeground': string;
    /* -- editorMarkerNavigation (1) -- */
    /** `--vscode-editorMarkerNavigation-background` - @example `#f5fbf0` */
    'editorMarkerNavigation.background': string;
    /* -- editorMarkerNavigationError (2) -- */
    /** `--vscode-editorMarkerNavigationError-background` - @example `#8e1400` */
    'editorMarkerNavigationError.background': string;
    /** `--vscode-editorMarkerNavigationError-headerBackground` - @example `rgba(142, 20, 0, 0.1)` */
    'editorMarkerNavigationError.headerBackground': string;
    /* -- editorMarkerNavigationInfo (2) -- */
    /** `--vscode-editorMarkerNavigationInfo-background` - @example `#004c6d` */
    'editorMarkerNavigationInfo.background': string;
    /** `--vscode-editorMarkerNavigationInfo-headerBackground` - @example `rgba(0, 76, 109, 0.1)` */
    'editorMarkerNavigationInfo.headerBackground': string;
    /* -- editorMarkerNavigationWarning (2) -- */
    /** `--vscode-editorMarkerNavigationWarning-background` - @example `#6c3a00` */
    'editorMarkerNavigationWarning.background': string;
    /** `--vscode-editorMarkerNavigationWarning-headerBackground` - @example `rgba(108, 58, 0, 0.1)` */
    'editorMarkerNavigationWarning.headerBackground': string;
    /* -- editorMinimap (1) -- */
    /** `--vscode-editorMinimap-inlineChatInserted` - @example `rgba(104, 255, 137, 0.48)` */
    'editorMinimap.inlineChatInserted': string;
    /* -- editorMultiCursor (2) -- */
    /** `--vscode-editorMultiCursor-primary-foreground` - @example `#006b2a` */
    'editorMultiCursor.primary.foreground': string;
    /** `--vscode-editorMultiCursor-secondary-foreground` - @example `#006b2a` */
    'editorMultiCursor.secondary.foreground': string;
    /* -- editorOverviewRuler (22) -- */
    /** `--vscode-editorOverviewRuler-addedForeground` - @example `rgba(0, 83, 31, 0.6)` */
    'editorOverviewRuler.addedForeground': string;
    /** `--vscode-editorOverviewRuler-border` - @example `rgba(127, 127, 127, 0.3)` */
    'editorOverviewRuler.border': string;
    /** `--vscode-editorOverviewRuler-bracketMatchForeground` - @example `#a0a0a0` */
    'editorOverviewRuler.bracketMatchForeground': string;
    /** `--vscode-editorOverviewRuler-commentDraftForeground` - @example `#d8e1d1` */
    'editorOverviewRuler.commentDraftForeground': string;
    /** `--vscode-editorOverviewRuler-commentForeground` - @example `#d8e1d1` */
    'editorOverviewRuler.commentForeground': string;
    /** `--vscode-editorOverviewRuler-commentUnresolvedForeground` - @example `#d8e1d1` */
    'editorOverviewRuler.commentUnresolvedForeground': string;
    /** `--vscode-editorOverviewRuler-commonContentForeground` - @example `rgba(96, 96, 96, 0.4)` */
    'editorOverviewRuler.commonContentForeground': string;
    /** `--vscode-editorOverviewRuler-currentContentForeground` - @example `rgba(64, 200, 174, 0.5)` */
    'editorOverviewRuler.currentContentForeground': string;
    /** `--vscode-editorOverviewRuler-deletedForeground` - @example `rgba(142, 20, 0, 0.6)` */
    'editorOverviewRuler.deletedForeground': string;
    /** `--vscode-editorOverviewRuler-errorForeground` - @example `rgba(142, 20, 0, 0.6)` */
    'editorOverviewRuler.errorForeground': string;
    /** `--vscode-editorOverviewRuler-findMatchForeground` - @example `rgba(209, 134, 22, 0.49)` */
    'editorOverviewRuler.findMatchForeground': string;
    /** `--vscode-editorOverviewRuler-incomingContentForeground` - @example `rgba(64, 166, 255, 0.5)` */
    'editorOverviewRuler.incomingContentForeground': string;
    /** `--vscode-editorOverviewRuler-infoForeground` - @example `rgba(0, 76, 109, 0.6)` */
    'editorOverviewRuler.infoForeground': string;
    /** `--vscode-editorOverviewRuler-inlineChatInserted` - @example `rgba(104, 255, 137, 0.48)` */
    'editorOverviewRuler.inlineChatInserted': string;
    /** `--vscode-editorOverviewRuler-inlineChatRemoved` - @example `rgba(255, 218, 211, 0.48)` */
    'editorOverviewRuler.inlineChatRemoved': string;
    /** `--vscode-editorOverviewRuler-modifiedForeground` - @example `rgba(0, 76, 109, 0.6)` */
    'editorOverviewRuler.modifiedForeground': string;
    /** `--vscode-editorOverviewRuler-rangeHighlightForeground` - @example `rgba(0, 122, 204, 0.6)` */
    'editorOverviewRuler.rangeHighlightForeground': string;
    /** `--vscode-editorOverviewRuler-selectionHighlightForeground` - @example `rgba(160, 160, 160, 0.8)` */
    'editorOverviewRuler.selectionHighlightForeground': string;
    /** `--vscode-editorOverviewRuler-warningForeground` - @example `rgba(108, 58, 0, 0.6)` */
    'editorOverviewRuler.warningForeground': string;
    /** `--vscode-editorOverviewRuler-wordHighlightForeground` - @example `rgba(160, 160, 160, 0.8)` */
    'editorOverviewRuler.wordHighlightForeground': string;
    /** `--vscode-editorOverviewRuler-wordHighlightStrongForeground` - @example `rgba(192, 160, 192, 0.8)` */
    'editorOverviewRuler.wordHighlightStrongForeground': string;
    /** `--vscode-editorOverviewRuler-wordHighlightTextForeground` - @example `rgba(160, 160, 160, 0.8)` */
    'editorOverviewRuler.wordHighlightTextForeground': string;
    /* -- editorPane (1) -- */
    /** `--vscode-editorPane-background` - @example `#f5fbf0` */
    'editorPane.background': string;
    /* -- editorRuler (1) -- */
    /** `--vscode-editorRuler-foreground` - @example `#d3d3d3` */
    'editorRuler.foreground': string;
    /* -- editorStickyScroll (2) -- */
    /** `--vscode-editorStickyScroll-background` - @example `#f5fbf0` */
    'editorStickyScroll.background': string;
    /** `--vscode-editorStickyScroll-shadow` - @example `#dddddd` */
    'editorStickyScroll.shadow': string;
    /* -- editorStickyScrollGutter (1) -- */
    /** `--vscode-editorStickyScrollGutter-background` - @example `#f5fbf0` */
    'editorStickyScrollGutter.background': string;
    /* -- editorStickyScrollHover (1) -- */
    /** `--vscode-editorStickyScrollHover-background` - @example `#f0f0f0` */
    'editorStickyScrollHover.background': string;
    /* -- editorSuggestWidget (7) -- */
    /** `--vscode-editorSuggestWidget-background` - @example `#f3f3f3` */
    'editorSuggestWidget.background': string;
    /** `--vscode-editorSuggestWidget-border` - @example `rgba(23, 29, 23, 0.2)` */
    'editorSuggestWidget.border': string;
    /** `--vscode-editorSuggestWidget-focusHighlightForeground` - @example `#006b2a` */
    'editorSuggestWidget.focusHighlightForeground': string;
    /** `--vscode-editorSuggestWidget-foreground` - @example `#171d17` */
    'editorSuggestWidget.foreground': string;
    /** `--vscode-editorSuggestWidget-highlightForeground` - @example `#006b2a` */
    'editorSuggestWidget.highlightForeground': string;
    /** `--vscode-editorSuggestWidget-selectedBackground` - @example `#dee4da` */
    'editorSuggestWidget.selectedBackground': string;
    /** `--vscode-editorSuggestWidget-selectedForeground` - @example `#171d17` */
    'editorSuggestWidget.selectedForeground': string;
    /* -- editorSuggestWidgetStatus (1) -- */
    /** `--vscode-editorSuggestWidgetStatus-foreground` - @example `rgba(23, 29, 23, 0.5)` */
    'editorSuggestWidgetStatus.foreground': string;
    /* -- editorUnicodeHighlight (1) -- */
    /** `--vscode-editorUnicodeHighlight-border` - @example `#6c3a00` */
    'editorUnicodeHighlight.border': string;
    /* -- editorUnnecessaryCode (1) -- */
    /** `--vscode-editorUnnecessaryCode-opacity` - @example `rgba(0, 0, 0, 0.47)` */
    'editorUnnecessaryCode.opacity': string;
    /* -- editorWarning (1) -- */
    /** `--vscode-editorWarning-foreground` - @example `#6c3a00` */
    'editorWarning.foreground': string;
    /* -- editorWhitespace (1) -- */
    /** `--vscode-editorWhitespace-foreground` - @example `#bdcaba` */
    'editorWhitespace.foreground': string;
    /* -- editorWidget (3) -- */
    /** `--vscode-editorWidget-background` - @example `#f3f3f3` */
    'editorWidget.background': string;
    /** `--vscode-editorWidget-border` - @example `rgba(23, 29, 23, 0.2)` */
    'editorWidget.border': string;
    /** `--vscode-editorWidget-foreground` - @example `#171d17` */
    'editorWidget.foreground': string;
    /* -- editorWordWrapIndicator (1) -- */
    /** `--vscode-editorWordWrapIndicator-foreground` - @example `#bdcaba` */
    'editorWordWrapIndicator.foreground': string;
    /* -- extensionBadge (2) -- */
    /** `--vscode-extensionBadge-remoteBackground` - @example `#008738` */
    'extensionBadge.remoteBackground': string;
    /** `--vscode-extensionBadge-remoteForeground` - @example `#f7fff2` */
    'extensionBadge.remoteForeground': string;
    /* -- extensionButton (8) -- */
    /** `--vscode-extensionButton-background` - @example `#dee4da` */
    'extensionButton.background': string;
    /** `--vscode-extensionButton-border` - @example `rgba(23, 29, 23, 0.15)` */
    'extensionButton.border': string;
    /** `--vscode-extensionButton-foreground` - @example `#171d17` */
    'extensionButton.foreground': string;
    /** `--vscode-extensionButton-hoverBackground` - @example `#dee4da` */
    'extensionButton.hoverBackground': string;
    /** `--vscode-extensionButton-prominentBackground` - @example `#006b2a` */
    'extensionButton.prominentBackground': string;
    /** `--vscode-extensionButton-prominentForeground` - @example `#ffffff` */
    'extensionButton.prominentForeground': string;
    /** `--vscode-extensionButton-prominentHoverBackground` - @example `#006b2a` */
    'extensionButton.prominentHoverBackground': string;
    /** `--vscode-extensionButton-separator` - @example `#bdcaba` */
    'extensionButton.separator': string;
    /* -- extensionIcon (5) -- */
    /** `--vscode-extensionIcon-preReleaseForeground` - @example `#1d9271` */
    'extensionIcon.preReleaseForeground': string;
    /** `--vscode-extensionIcon-privateForeground` - @example `rgba(0, 0, 0, 0.38)` */
    'extensionIcon.privateForeground': string;
    /** `--vscode-extensionIcon-sponsorForeground` - @example `#b51e78` */
    'extensionIcon.sponsorForeground': string;
    /** `--vscode-extensionIcon-starForeground` - @example `#df6100` */
    'extensionIcon.starForeground': string;
    /** `--vscode-extensionIcon-verifiedForeground` - @example `#006b2a` */
    'extensionIcon.verifiedForeground': string;
    /* -- git (1) -- */
    /** `--vscode-git-blame-editorDecorationForeground` - @example `#969696` */
    'git.blame.editorDecorationForeground': string;
    /* -- gitDecoration (10) -- */
    /** `--vscode-gitDecoration-addedResourceForeground` - @example `#00531f` */
    'gitDecoration.addedResourceForeground': string;
    /** `--vscode-gitDecoration-conflictingResourceForeground` - @example `#8e1400` */
    'gitDecoration.conflictingResourceForeground': string;
    /** `--vscode-gitDecoration-deletedResourceForeground` - @example `#8e1400` */
    'gitDecoration.deletedResourceForeground': string;
    /** `--vscode-gitDecoration-ignoredResourceForeground` - @example `#777777` */
    'gitDecoration.ignoredResourceForeground': string;
    /** `--vscode-gitDecoration-modifiedResourceForeground` - @example `#004c6d` */
    'gitDecoration.modifiedResourceForeground': string;
    /** `--vscode-gitDecoration-renamedResourceForeground` - @example `#560bc5` */
    'gitDecoration.renamedResourceForeground': string;
    /** `--vscode-gitDecoration-stageDeletedResourceForeground` - @example `#8e1400` */
    'gitDecoration.stageDeletedResourceForeground': string;
    /** `--vscode-gitDecoration-stageModifiedResourceForeground` - @example `#6c3a00` */
    'gitDecoration.stageModifiedResourceForeground': string;
    /** `--vscode-gitDecoration-submoduleResourceForeground` - @example `#004c6d` */
    'gitDecoration.submoduleResourceForeground': string;
    /** `--vscode-gitDecoration-untrackedResourceForeground` - @example `#00531f` */
    'gitDecoration.untrackedResourceForeground': string;
    /* -- icon (1) -- */
    /** `--vscode-icon-foreground` - @example `#171d17` */
    'icon.foreground': string;
    /* -- inactiveSessionView (2) -- */
    /** `--vscode-inactiveSessionView-background` - @example `#f5fbf0` */
    'inactiveSessionView.background': string;
    /** `--vscode-inactiveSessionView-foreground` - @example `#171d17` */
    'inactiveSessionView.foreground': string;
    /* -- inlineChat (4) -- */
    /** `--vscode-inlineChat-background` - @example `#f3f3f3` */
    'inlineChat.background': string;
    /** `--vscode-inlineChat-border` - @example `rgba(23, 29, 23, 0.2)` */
    'inlineChat.border': string;
    /** `--vscode-inlineChat-foreground` - @example `#171d17` */
    'inlineChat.foreground': string;
    /** `--vscode-inlineChat-shadow` - @example `#000000` */
    'inlineChat.shadow': string;
    /* -- inlineChatDiff (2) -- */
    /** `--vscode-inlineChatDiff-inserted` - @example `rgba(104, 255, 137, 0.3)` */
    'inlineChatDiff.inserted': string;
    /** `--vscode-inlineChatDiff-removed` - @example `rgba(255, 218, 211, 0.3)` */
    'inlineChatDiff.removed': string;
    /* -- inlineChatInput (4) -- */
    /** `--vscode-inlineChatInput-background` - @example `#dee4da` */
    'inlineChatInput.background': string;
    /** `--vscode-inlineChatInput-border` - @example `rgba(23, 29, 23, 0.2)` */
    'inlineChatInput.border': string;
    /** `--vscode-inlineChatInput-focusBorder` - @example `#006b2a` */
    'inlineChatInput.focusBorder': string;
    /** `--vscode-inlineChatInput-placeholderForeground` - @example `#3e4a3e` */
    'inlineChatInput.placeholderForeground': string;
    /* -- inlineEdit (20) -- */
    /** `--vscode-inlineEdit-gutterIndicator-background` - @example `rgba(95, 95, 95, 0.09)` */
    'inlineEdit.gutterIndicator.background': string;
    /** `--vscode-inlineEdit-gutterIndicator-primaryBackground` - @example `rgba(0, 107, 42, 0.5)` */
    'inlineEdit.gutterIndicator.primaryBackground': string;
    /** `--vscode-inlineEdit-gutterIndicator-primaryBorder` - @example `#006b2a` */
    'inlineEdit.gutterIndicator.primaryBorder': string;
    /** `--vscode-inlineEdit-gutterIndicator-primaryForeground` - @example `#ffffff` */
    'inlineEdit.gutterIndicator.primaryForeground': string;
    /** `--vscode-inlineEdit-gutterIndicator-secondaryBackground` - @example `#f3f3f3` */
    'inlineEdit.gutterIndicator.secondaryBackground': string;
    /** `--vscode-inlineEdit-gutterIndicator-secondaryBorder` - @example `rgba(23, 29, 23, 0.2)` */
    'inlineEdit.gutterIndicator.secondaryBorder': string;
    /** `--vscode-inlineEdit-gutterIndicator-secondaryForeground` - @example `#171d17` */
    'inlineEdit.gutterIndicator.secondaryForeground': string;
    /** `--vscode-inlineEdit-gutterIndicator-successfulBackground` - @example `#006b2a` */
    'inlineEdit.gutterIndicator.successfulBackground': string;
    /** `--vscode-inlineEdit-gutterIndicator-successfulBorder` - @example `#006b2a` */
    'inlineEdit.gutterIndicator.successfulBorder': string;
    /** `--vscode-inlineEdit-gutterIndicator-successfulForeground` - @example `#ffffff` */
    'inlineEdit.gutterIndicator.successfulForeground': string;
    /** `--vscode-inlineEdit-modifiedBackground` - @example `rgba(104, 255, 137, 0.18)` */
    'inlineEdit.modifiedBackground': string;
    /** `--vscode-inlineEdit-modifiedBorder` - @example `rgba(0, 144, 31, 0.6)` */
    'inlineEdit.modifiedBorder': string;
    /** `--vscode-inlineEdit-modifiedChangedLineBackground` - @example `rgba(104, 255, 137, 0.28)` */
    'inlineEdit.modifiedChangedLineBackground': string;
    /** `--vscode-inlineEdit-modifiedChangedTextBackground` - @example `rgba(104, 255, 137, 0.42)` */
    'inlineEdit.modifiedChangedTextBackground': string;
    /** `--vscode-inlineEdit-originalBackground` - @example `rgba(255, 218, 211, 0.12)` */
    'inlineEdit.originalBackground': string;
    /** `--vscode-inlineEdit-originalBorder` - @example `rgba(255, 218, 211, 0.6)` */
    'inlineEdit.originalBorder': string;
    /** `--vscode-inlineEdit-originalChangedLineBackground` - @example `rgba(255, 218, 211, 0.48)` */
    'inlineEdit.originalChangedLineBackground': string;
    /** `--vscode-inlineEdit-originalChangedTextBackground` - @example `rgba(255, 218, 211, 0.48)` */
    'inlineEdit.originalChangedTextBackground': string;
    /** `--vscode-inlineEdit-tabWillAcceptModifiedBorder` - @example `rgba(0, 144, 31, 0.6)` */
    'inlineEdit.tabWillAcceptModifiedBorder': string;
    /** `--vscode-inlineEdit-tabWillAcceptOriginalBorder` - @example `rgba(255, 218, 211, 0.6)` */
    'inlineEdit.tabWillAcceptOriginalBorder': string;
    /* -- input (4) -- */
    /** `--vscode-input-background` - @example `#dee4da` */
    'input.background': string;
    /** `--vscode-input-border` - @example `#bdcaba` */
    'input.border': string;
    /** `--vscode-input-foreground` - @example `#171d17` */
    'input.foreground': string;
    /** `--vscode-input-placeholderForeground` - @example `#3e4a3e` */
    'input.placeholderForeground': string;
    /* -- inputOption (4) -- */
    /** `--vscode-inputOption-activeBackground` - @example `rgba(0, 107, 42, 0.2)` */
    'inputOption.activeBackground': string;
    /** `--vscode-inputOption-activeBorder` - @example `#007acc` */
    'inputOption.activeBorder': string;
    /** `--vscode-inputOption-activeForeground` - @example `#000000` */
    'inputOption.activeForeground': string;
    /** `--vscode-inputOption-hoverBackground` - @example `rgba(184, 184, 184, 0.31)` */
    'inputOption.hoverBackground': string;
    /* -- inputValidation (6) -- */
    /** `--vscode-inputValidation-errorBackground` - @example `#f2dede` */
    'inputValidation.errorBackground': string;
    /** `--vscode-inputValidation-errorBorder` - @example `#be1100` */
    'inputValidation.errorBorder': string;
    /** `--vscode-inputValidation-infoBackground` - @example `#d6ecf2` */
    'inputValidation.infoBackground': string;
    /** `--vscode-inputValidation-infoBorder` - @example `#007acc` */
    'inputValidation.infoBorder': string;
    /** `--vscode-inputValidation-warningBackground` - @example `#f6f5d2` */
    'inputValidation.warningBackground': string;
    /** `--vscode-inputValidation-warningBorder` - @example `#b89500` */
    'inputValidation.warningBorder': string;
    /* -- interactive (2) -- */
    /** `--vscode-interactive-activeCodeBorder` - @example `#007acc` */
    'interactive.activeCodeBorder': string;
    /** `--vscode-interactive-inactiveCodeBorder` - @example `#e4eadf` */
    'interactive.inactiveCodeBorder': string;
    /* -- keybindingLabel (4) -- */
    /** `--vscode-keybindingLabel-background` - @example `rgba(221, 221, 221, 0.4)` */
    'keybindingLabel.background': string;
    /** `--vscode-keybindingLabel-border` - @example `rgba(204, 204, 204, 0.4)` */
    'keybindingLabel.border': string;
    /** `--vscode-keybindingLabel-bottomBorder` - @example `rgba(187, 187, 187, 0.4)` */
    'keybindingLabel.bottomBorder': string;
    /** `--vscode-keybindingLabel-foreground` - @example `#555555` */
    'keybindingLabel.foreground': string;
    /* -- keybindingTable (2) -- */
    /** `--vscode-keybindingTable-headerBackground` - @example `rgba(23, 29, 23, 0.04)` */
    'keybindingTable.headerBackground': string;
    /** `--vscode-keybindingTable-rowsBackground` - @example `rgba(23, 29, 23, 0.04)` */
    'keybindingTable.rowsBackground': string;
    /* -- list (16) -- */
    /** `--vscode-list-activeSelectionBackground` - @example `#dee4da` */
    'list.activeSelectionBackground': string;
    /** `--vscode-list-activeSelectionForeground` - @example `#171d17` */
    'list.activeSelectionForeground': string;
    /** `--vscode-list-deemphasizedForeground` - @example `#8e8e90` */
    'list.deemphasizedForeground': string;
    /** `--vscode-list-dropBackground` - @example `#d6ebff` */
    'list.dropBackground': string;
    /** `--vscode-list-dropBetweenBackground` - @example `#171d17` */
    'list.dropBetweenBackground': string;
    /** `--vscode-list-errorForeground` - @example `#8e1400` */
    'list.errorForeground': string;
    /** `--vscode-list-filterMatchBackground` - @example `rgba(192, 238, 192, 0.4)` */
    'list.filterMatchBackground': string;
    /** `--vscode-list-focusHighlightForeground` - @example `#006b2a` */
    'list.focusHighlightForeground': string;
    /** `--vscode-list-focusOutline` - @example `#006b2a` */
    'list.focusOutline': string;
    /** `--vscode-list-highlightForeground` - @example `#006b2a` */
    'list.highlightForeground': string;
    /** `--vscode-list-hoverBackground` - @example `#e4eadf` */
    'list.hoverBackground': string;
    /** `--vscode-list-hoverForeground` - @example `#171d17` */
    'list.hoverForeground': string;
    /** `--vscode-list-inactiveSelectionBackground` - @example `#e4eadf` */
    'list.inactiveSelectionBackground': string;
    /** `--vscode-list-inactiveSelectionForeground` - @example `#171d17` */
    'list.inactiveSelectionForeground': string;
    /** `--vscode-list-invalidItemForeground` - @example `#b89500` */
    'list.invalidItemForeground': string;
    /** `--vscode-list-warningForeground` - @example `#6c3a00` */
    'list.warningForeground': string;
    /* -- listFilterWidget (4) -- */
    /** `--vscode-listFilterWidget-background` - @example `#f3f3f3` */
    'listFilterWidget.background': string;
    /** `--vscode-listFilterWidget-noMatchesOutline` - @example `#be1100` */
    'listFilterWidget.noMatchesOutline': string;
    /** `--vscode-listFilterWidget-outline` - @example `rgba(0, 0, 0, 0)` */
    'listFilterWidget.outline': string;
    /** `--vscode-listFilterWidget-shadow` - @example `#000000` */
    'listFilterWidget.shadow': string;
    /* -- markdownAlert (5) -- */
    /** `--vscode-markdownAlert-caution-foreground` - @example `#8e1400` */
    'markdownAlert.caution.foreground': string;
    /** `--vscode-markdownAlert-important-foreground` - @example `#652d90` */
    'markdownAlert.important.foreground': string;
    /** `--vscode-markdownAlert-note-foreground` - @example `#004c6d` */
    'markdownAlert.note.foreground': string;
    /** `--vscode-markdownAlert-tip-foreground` - @example `#388a34` */
    'markdownAlert.tip.foreground': string;
    /** `--vscode-markdownAlert-warning-foreground` - @example `#6c3a00` */
    'markdownAlert.warning.foreground': string;
    /* -- mcpIcon (1) -- */
    /** `--vscode-mcpIcon-starForeground` - @example `#df6100` */
    'mcpIcon.starForeground': string;
    /* -- menu (6) -- */
    /** `--vscode-menu-background` - @example `#f5fbf0` */
    'menu.background': string;
    /** `--vscode-menu-border` - @example `#bdcaba` */
    'menu.border': string;
    /** `--vscode-menu-foreground` - @example `#171d17` */
    'menu.foreground': string;
    /** `--vscode-menu-selectionBackground` - @example `#dee4da` */
    'menu.selectionBackground': string;
    /** `--vscode-menu-selectionForeground` - @example `#171d17` */
    'menu.selectionForeground': string;
    /** `--vscode-menu-separatorBackground` - @example `#bdcaba` */
    'menu.separatorBackground': string;
    /* -- menubar (2) -- */
    /** `--vscode-menubar-selectionBackground` - @example `rgba(184, 184, 184, 0.31)` */
    'menubar.selectionBackground': string;
    /** `--vscode-menubar-selectionForeground` - @example `#171d17` */
    'menubar.selectionForeground': string;
    /* -- merge (6) -- */
    /** `--vscode-merge-commonContentBackground` - @example `rgba(96, 96, 96, 0.16)` */
    'merge.commonContentBackground': string;
    /** `--vscode-merge-commonHeaderBackground` - @example `rgba(96, 96, 96, 0.4)` */
    'merge.commonHeaderBackground': string;
    /** `--vscode-merge-currentContentBackground` - @example `rgba(64, 200, 174, 0.2)` */
    'merge.currentContentBackground': string;
    /** `--vscode-merge-currentHeaderBackground` - @example `rgba(64, 200, 174, 0.5)` */
    'merge.currentHeaderBackground': string;
    /** `--vscode-merge-incomingContentBackground` - @example `rgba(64, 166, 255, 0.2)` */
    'merge.incomingContentBackground': string;
    /** `--vscode-merge-incomingHeaderBackground` - @example `rgba(64, 166, 255, 0.5)` */
    'merge.incomingHeaderBackground': string;
    /* -- mergeEditor (13) -- */
    /** `--vscode-mergeEditor-change-background` - @example `rgba(155, 185, 85, 0.2)` */
    'mergeEditor.change.background': string;
    /** `--vscode-mergeEditor-change-word-background` - @example `rgba(156, 204, 44, 0.4)` */
    'mergeEditor.change.word.background': string;
    /** `--vscode-mergeEditor-changeBase-background` - @example `#ffcccc` */
    'mergeEditor.changeBase.background': string;
    /** `--vscode-mergeEditor-changeBase-word-background` - @example `#ffa3a3` */
    'mergeEditor.changeBase.word.background': string;
    /** `--vscode-mergeEditor-conflict-handled-minimapOverViewRuler` - @example `rgba(173, 172, 168, 0.93)` */
    'mergeEditor.conflict.handled.minimapOverViewRuler': string;
    /** `--vscode-mergeEditor-conflict-handledFocused-border` - @example `rgba(193, 193, 193, 0.8)` */
    'mergeEditor.conflict.handledFocused.border': string;
    /** `--vscode-mergeEditor-conflict-handledUnfocused-border` - @example `rgba(134, 134, 134, 0.29)` */
    'mergeEditor.conflict.handledUnfocused.border': string;
    /** `--vscode-mergeEditor-conflict-input1-background` - @example `rgba(64, 200, 174, 0.2)` */
    'mergeEditor.conflict.input1.background': string;
    /** `--vscode-mergeEditor-conflict-input2-background` - @example `rgba(64, 166, 255, 0.2)` */
    'mergeEditor.conflict.input2.background': string;
    /** `--vscode-mergeEditor-conflict-unhandled-minimapOverViewRuler` - @example `#fcba03` */
    'mergeEditor.conflict.unhandled.minimapOverViewRuler': string;
    /** `--vscode-mergeEditor-conflict-unhandledFocused-border` - @example `#ffa600` */
    'mergeEditor.conflict.unhandledFocused.border': string;
    /** `--vscode-mergeEditor-conflict-unhandledUnfocused-border` - @example `#ffa600` */
    'mergeEditor.conflict.unhandledUnfocused.border': string;
    /** `--vscode-mergeEditor-conflictingLines-background` - @example `rgba(255, 234, 0, 0.28)` */
    'mergeEditor.conflictingLines.background': string;
    /* -- minimap (8) -- */
    /** `--vscode-minimap-chatEditHighlight` - @example `rgba(245, 251, 240, 0.6)` */
    'minimap.chatEditHighlight': string;
    /** `--vscode-minimap-errorHighlight` - @example `rgba(255, 18, 18, 0.7)` */
    'minimap.errorHighlight': string;
    /** `--vscode-minimap-findMatchHighlight` - @example `rgba(192, 238, 192, 0.4)` */
    'minimap.findMatchHighlight': string;
    /** `--vscode-minimap-foregroundOpacity` - @example `#000000` */
    'minimap.foregroundOpacity': string;
    /** `--vscode-minimap-infoHighlight` - @example `#004c6d` */
    'minimap.infoHighlight': string;
    /** `--vscode-minimap-selectionHighlight` - @example `#dee4da` */
    'minimap.selectionHighlight': string;
    /** `--vscode-minimap-selectionOccurrenceHighlight` - @example `rgba(236, 239, 233, 0.6)` */
    'minimap.selectionOccurrenceHighlight': string;
    /** `--vscode-minimap-warningHighlight` - @example `#6c3a00` */
    'minimap.warningHighlight': string;
    /* -- minimapGutter (3) -- */
    /** `--vscode-minimapGutter-addedBackground` - @example `#00531f` */
    'minimapGutter.addedBackground': string;
    /** `--vscode-minimapGutter-deletedBackground` - @example `#8e1400` */
    'minimapGutter.deletedBackground': string;
    /** `--vscode-minimapGutter-modifiedBackground` - @example `#004c6d` */
    'minimapGutter.modifiedBackground': string;
    /* -- minimapSlider (3) -- */
    /** `--vscode-minimapSlider-activeBackground` - @example `rgba(62, 74, 62, 0.35)` */
    'minimapSlider.activeBackground': string;
    /** `--vscode-minimapSlider-background` - @example `rgba(62, 74, 62, 0.2)` */
    'minimapSlider.background': string;
    /** `--vscode-minimapSlider-hoverBackground` - @example `rgba(62, 74, 62, 0.3)` */
    'minimapSlider.hoverBackground': string;
    /* -- modernActivityBar (3) -- */
    /** `--vscode-modernActivityBar-background` - @example `#eff6eb` */
    'modernActivityBar.background': string;
    /** `--vscode-modernActivityBar-border` - @example `#d3d9cf` */
    'modernActivityBar.border': string;
    /** `--vscode-modernActivityBar-inactiveBackground` - @example `#eff6eb` */
    'modernActivityBar.inactiveBackground': string;
    /* -- modernActivityBarItem (4) -- */
    /** `--vscode-modernActivityBarItem-activeBackground` - @example `#c0eec0` */
    'modernActivityBarItem.activeBackground': string;
    /** `--vscode-modernActivityBarItem-activeForeground` - @example `#456e49` */
    'modernActivityBarItem.activeForeground': string;
    /** `--vscode-modernActivityBarItem-hoverBackground` - @example `#dee4da` */
    'modernActivityBarItem.hoverBackground': string;
    /** `--vscode-modernActivityBarItem-hoverForeground` - @example `#3e4a3e` */
    'modernActivityBarItem.hoverForeground': string;
    /* -- modernEditorTab (10) -- */
    /** `--vscode-modernEditorTab-activeActionBackground` - @example `#008738` */
    'modernEditorTab.activeActionBackground': string;
    /** `--vscode-modernEditorTab-activeBackground` - @example `#008738` */
    'modernEditorTab.activeBackground': string;
    /** `--vscode-modernEditorTab-activeForeground` - @example `#f7fff2` */
    'modernEditorTab.activeForeground': string;
    /** `--vscode-modernEditorTab-activeHoverActionBackground` - @example `#008738` */
    'modernEditorTab.activeHoverActionBackground': string;
    /** `--vscode-modernEditorTab-activeHoverBackground` - @example `#008738` */
    'modernEditorTab.activeHoverBackground': string;
    /** `--vscode-modernEditorTab-hoverActionBackground` - @example `#dee4da` */
    'modernEditorTab.hoverActionBackground': string;
    /** `--vscode-modernEditorTab-hoverBackground` - @example `#dee4da` */
    'modernEditorTab.hoverBackground': string;
    /** `--vscode-modernEditorTab-hoverForeground` - @example `#3e4a3e` */
    'modernEditorTab.hoverForeground': string;
    /** `--vscode-modernEditorTab-inactiveBackground` - @example `#d9e6d6` */
    'modernEditorTab.inactiveBackground': string;
    /** `--vscode-modernEditorTab-selectedActionBackground` - @example `#dee4da` */
    'modernEditorTab.selectedActionBackground': string;
    /* -- modernPanel (1) -- */
    /** `--vscode-modernPanel-border` - @example `#d3d9cf` */
    'modernPanel.border': string;
    /* -- modernSash (1) -- */
    /** `--vscode-modernSash-gripForeground` - @example `rgba(23, 29, 23, 0.4)` */
    'modernSash.gripForeground': string;
    /* -- modernTab (4) -- */
    /** `--vscode-modernTab-activeBackground` - @example `#008738` */
    'modernTab.activeBackground': string;
    /** `--vscode-modernTab-activeForeground` - @example `#f7fff2` */
    'modernTab.activeForeground': string;
    /** `--vscode-modernTab-hoverBackground` - @example `#dee4da` */
    'modernTab.hoverBackground': string;
    /** `--vscode-modernTab-hoverForeground` - @example `#3e4a3e` */
    'modernTab.hoverForeground': string;
    /* -- modernUI (2) -- */
    /** `--vscode-modernUI-inactiveShellBackground` - @example `#eff6eb` */
    'modernUI.inactiveShellBackground': string;
    /** `--vscode-modernUI-shellBackground` - @example `#e9f0e5` */
    'modernUI.shellBackground': string;
    /* -- multiDiffEditor (3) -- */
    /** `--vscode-multiDiffEditor-background` - @example `#f5fbf0` */
    'multiDiffEditor.background': string;
    /** `--vscode-multiDiffEditor-border` - @example `#cccccc` */
    'multiDiffEditor.border': string;
    /** `--vscode-multiDiffEditor-headerBackground` - @example `#d9e6d6` */
    'multiDiffEditor.headerBackground': string;
    /* -- notebook (12) -- */
    /** `--vscode-notebook-cellBorderColor` - @example `#e4eadf` */
    'notebook.cellBorderColor': string;
    /** `--vscode-notebook-cellEditorBackground` - @example `#f5fbf0` */
    'notebook.cellEditorBackground': string;
    /** `--vscode-notebook-cellInsertionIndicator` - @example `#006b2a` */
    'notebook.cellInsertionIndicator': string;
    /** `--vscode-notebook-cellStatusBarItemHoverBackground` - @example `rgba(0, 0, 0, 0.08)` */
    'notebook.cellStatusBarItemHoverBackground': string;
    /** `--vscode-notebook-cellToolbarSeparator` - @example `rgba(128, 128, 128, 0.35)` */
    'notebook.cellToolbarSeparator': string;
    /** `--vscode-notebook-editorBackground` - @example `#f5fbf0` */
    'notebook.editorBackground': string;
    /** `--vscode-notebook-focusedCellBorder` - @example `#006b2a` */
    'notebook.focusedCellBorder': string;
    /** `--vscode-notebook-focusedEditorBorder` - @example `#006b2a` */
    'notebook.focusedEditorBorder': string;
    /** `--vscode-notebook-inactiveFocusedCellBorder` - @example `#e4eadf` */
    'notebook.inactiveFocusedCellBorder': string;
    /** `--vscode-notebook-selectedCellBackground` - @example `#e4eadf` */
    'notebook.selectedCellBackground': string;
    /** `--vscode-notebook-selectedCellBorder` - @example `#e4eadf` */
    'notebook.selectedCellBorder': string;
    /** `--vscode-notebook-symbolHighlightBackground` - @example `rgba(253, 255, 0, 0.2)` */
    'notebook.symbolHighlightBackground': string;
    /* -- notebookEditorOverviewRuler (1) -- */
    /** `--vscode-notebookEditorOverviewRuler-runningCellForeground` - @example `#388a34` */
    'notebookEditorOverviewRuler.runningCellForeground': string;
    /* -- notebookScrollbarSlider (3) -- */
    /** `--vscode-notebookScrollbarSlider-activeBackground` - @example `rgba(62, 74, 62, 0.7)` */
    'notebookScrollbarSlider.activeBackground': string;
    /** `--vscode-notebookScrollbarSlider-background` - @example `rgba(62, 74, 62, 0.4)` */
    'notebookScrollbarSlider.background': string;
    /** `--vscode-notebookScrollbarSlider-hoverBackground` - @example `rgba(62, 74, 62, 0.6)` */
    'notebookScrollbarSlider.hoverBackground': string;
    /* -- notebookStatusErrorIcon (1) -- */
    /** `--vscode-notebookStatusErrorIcon-foreground` - @example `#8e1400` */
    'notebookStatusErrorIcon.foreground': string;
    /* -- notebookStatusRunningIcon (1) -- */
    /** `--vscode-notebookStatusRunningIcon-foreground` - @example `#171d17` */
    'notebookStatusRunningIcon.foreground': string;
    /* -- notebookStatusSuccessIcon (1) -- */
    /** `--vscode-notebookStatusSuccessIcon-foreground` - @example `#388a34` */
    'notebookStatusSuccessIcon.foreground': string;
    /* -- notificationCenter (1) -- */
    /** `--vscode-notificationCenter-border` - @example `#bdcaba` */
    'notificationCenter.border': string;
    /* -- notificationCenterHeader (1) -- */
    /** `--vscode-notificationCenterHeader-background` - @example `#e8f6dd` */
    'notificationCenterHeader.background': string;
    /* -- notificationLink (1) -- */
    /** `--vscode-notificationLink-foreground` - @example `#006b2a` */
    'notificationLink.foreground': string;
    /* -- notificationToast (1) -- */
    /** `--vscode-notificationToast-border` - @example `#bdcaba` */
    'notificationToast.border': string;
    /* -- notifications (3) -- */
    /** `--vscode-notifications-background` - @example `#f5fbf0` */
    'notifications.background': string;
    /** `--vscode-notifications-border` - @example `#bdcaba` */
    'notifications.border': string;
    /** `--vscode-notifications-foreground` - @example `#171d17` */
    'notifications.foreground': string;
    /* -- notificationsErrorIcon (1) -- */
    /** `--vscode-notificationsErrorIcon-foreground` - @example `#8e1400` */
    'notificationsErrorIcon.foreground': string;
    /* -- notificationsInfoIcon (1) -- */
    /** `--vscode-notificationsInfoIcon-foreground` - @example `#004c6d` */
    'notificationsInfoIcon.foreground': string;
    /* -- notificationsWarningIcon (1) -- */
    /** `--vscode-notificationsWarningIcon-foreground` - @example `#6c3a00` */
    'notificationsWarningIcon.foreground': string;
    /* -- panel (3) -- */
    /** `--vscode-panel-background` - @example `#f5fbf0` */
    'panel.background': string;
    /** `--vscode-panel-border` - @example `#bdcaba` */
    'panel.border': string;
    /** `--vscode-panel-dropBorder` - @example `#171d17` */
    'panel.dropBorder': string;
    /* -- panelInput (1) -- */
    /** `--vscode-panelInput-border` - @example `#dddddd` */
    'panelInput.border': string;
    /* -- panelSection (2) -- */
    /** `--vscode-panelSection-border` - @example `#bdcaba` */
    'panelSection.border': string;
    /** `--vscode-panelSection-dropBackground` - @example `rgba(0, 107, 42, 0.4)` */
    'panelSection.dropBackground': string;
    /* -- panelSectionHeader (1) -- */
    /** `--vscode-panelSectionHeader-background` - @example `rgba(128, 128, 128, 0.2)` */
    'panelSectionHeader.background': string;
    /* -- panelStickyScroll (2) -- */
    /** `--vscode-panelStickyScroll-background` - @example `#f5fbf0` */
    'panelStickyScroll.background': string;
    /** `--vscode-panelStickyScroll-shadow` - @example `#dddddd` */
    'panelStickyScroll.shadow': string;
    /* -- panelTitle (3) -- */
    /** `--vscode-panelTitle-activeBorder` - @example `#006b2a` */
    'panelTitle.activeBorder': string;
    /** `--vscode-panelTitle-activeForeground` - @example `#171d17` */
    'panelTitle.activeForeground': string;
    /** `--vscode-panelTitle-inactiveForeground` - @example `#3e4a3e` */
    'panelTitle.inactiveForeground': string;
    /* -- panelTitleBadge (2) -- */
    /** `--vscode-panelTitleBadge-background` - @example `#008738` */
    'panelTitleBadge.background': string;
    /** `--vscode-panelTitleBadge-foreground` - @example `#f7fff2` */
    'panelTitleBadge.foreground': string;
    /* -- peekView (1) -- */
    /** `--vscode-peekView-border` - @example `#004c6d` */
    'peekView.border': string;
    /* -- peekViewEditor (2) -- */
    /** `--vscode-peekViewEditor-background` - @example `#f2f8fc` */
    'peekViewEditor.background': string;
    /** `--vscode-peekViewEditor-matchHighlightBackground` - @example `rgba(245, 216, 2, 0.87)` */
    'peekViewEditor.matchHighlightBackground': string;
    /* -- peekViewEditorGutter (1) -- */
    /** `--vscode-peekViewEditorGutter-background` - @example `#f2f8fc` */
    'peekViewEditorGutter.background': string;
    /* -- peekViewEditorStickyScroll (1) -- */
    /** `--vscode-peekViewEditorStickyScroll-background` - @example `#f2f8fc` */
    'peekViewEditorStickyScroll.background': string;
    /* -- peekViewEditorStickyScrollGutter (1) -- */
    /** `--vscode-peekViewEditorStickyScrollGutter-background` - @example `#f2f8fc` */
    'peekViewEditorStickyScrollGutter.background': string;
    /* -- peekViewResult (6) -- */
    /** `--vscode-peekViewResult-background` - @example `#f3f3f3` */
    'peekViewResult.background': string;
    /** `--vscode-peekViewResult-fileForeground` - @example `#1e1e1e` */
    'peekViewResult.fileForeground': string;
    /** `--vscode-peekViewResult-lineForeground` - @example `#646465` */
    'peekViewResult.lineForeground': string;
    /** `--vscode-peekViewResult-matchHighlightBackground` - @example `rgba(234, 92, 0, 0.3)` */
    'peekViewResult.matchHighlightBackground': string;
    /** `--vscode-peekViewResult-selectionBackground` - @example `rgba(51, 153, 255, 0.2)` */
    'peekViewResult.selectionBackground': string;
    /** `--vscode-peekViewResult-selectionForeground` - @example `#6c6c6c` */
    'peekViewResult.selectionForeground': string;
    /* -- peekViewTitle (1) -- */
    /** `--vscode-peekViewTitle-background` - @example `#f3f3f3` */
    'peekViewTitle.background': string;
    /* -- peekViewTitleDescription (1) -- */
    /** `--vscode-peekViewTitleDescription-foreground` - @example `#616161` */
    'peekViewTitleDescription.foreground': string;
    /* -- peekViewTitleLabel (1) -- */
    /** `--vscode-peekViewTitleLabel-foreground` - @example `#000000` */
    'peekViewTitleLabel.foreground': string;
    /* -- pickerGroup (2) -- */
    /** `--vscode-pickerGroup-border` - @example `#cccedb` */
    'pickerGroup.border': string;
    /** `--vscode-pickerGroup-foreground` - @example `#0066bf` */
    'pickerGroup.foreground': string;
    /* -- ports (1) -- */
    /** `--vscode-ports-iconRunningProcessForeground` - @example `#008738` */
    'ports.iconRunningProcessForeground': string;
    /* -- problemsErrorIcon (1) -- */
    /** `--vscode-problemsErrorIcon-foreground` - @example `#8e1400` */
    'problemsErrorIcon.foreground': string;
    /* -- problemsInfoIcon (1) -- */
    /** `--vscode-problemsInfoIcon-foreground` - @example `#004c6d` */
    'problemsInfoIcon.foreground': string;
    /* -- problemsWarningIcon (1) -- */
    /** `--vscode-problemsWarningIcon-foreground` - @example `#6c3a00` */
    'problemsWarningIcon.foreground': string;
    /* -- profileBadge (2) -- */
    /** `--vscode-profileBadge-background` - @example `#c4c4c4` */
    'profileBadge.background': string;
    /** `--vscode-profileBadge-foreground` - @example `#333333` */
    'profileBadge.foreground': string;
    /* -- profiles (1) -- */
    /** `--vscode-profiles-sashBorder` - @example `#bdcaba` */
    'profiles.sashBorder': string;
    /* -- progressBar (1) -- */
    /** `--vscode-progressBar-background` - @example `#006b2a` */
    'progressBar.background': string;
    /* -- quickInput (2) -- */
    /** `--vscode-quickInput-background` - @example `#f5fbf0` */
    'quickInput.background': string;
    /** `--vscode-quickInput-foreground` - @example `#171d17` */
    'quickInput.foreground': string;
    /* -- quickInputList (3) -- */
    /** `--vscode-quickInputList-focusBackground` - @example `#dee4da` */
    'quickInputList.focusBackground': string;
    /** `--vscode-quickInputList-focusForeground` - @example `#171d17` */
    'quickInputList.focusForeground': string;
    /** `--vscode-quickInputList-focusHighlightForeground` - @example `#006b2a` */
    'quickInputList.focusHighlightForeground': string;
    /* -- quickInputTitle (1) -- */
    /** `--vscode-quickInputTitle-background` - @example `rgba(0, 0, 0, 0.06)` */
    'quickInputTitle.background': string;
    /* -- radio (5) -- */
    /** `--vscode-radio-activeBackground` - @example `rgba(0, 107, 42, 0.2)` */
    'radio.activeBackground': string;
    /** `--vscode-radio-activeBorder` - @example `#007acc` */
    'radio.activeBorder': string;
    /** `--vscode-radio-activeForeground` - @example `#000000` */
    'radio.activeForeground': string;
    /** `--vscode-radio-inactiveBorder` - @example `rgba(0, 0, 0, 0.2)` */
    'radio.inactiveBorder': string;
    /** `--vscode-radio-inactiveHoverBackground` - @example `rgba(184, 184, 184, 0.31)` */
    'radio.inactiveHoverBackground': string;
    /* -- sash (1) -- */
    /** `--vscode-sash-hoverBorder` - @example `#006b2a` */
    'sash.hoverBorder': string;
    /* -- scmGraph (13) -- */
    /** `--vscode-scmGraph-foreground1` - @example `#ffb000` */
    'scmGraph.foreground1': string;
    /** `--vscode-scmGraph-foreground2` - @example `#dc267f` */
    'scmGraph.foreground2': string;
    /** `--vscode-scmGraph-foreground3` - @example `#994f00` */
    'scmGraph.foreground3': string;
    /** `--vscode-scmGraph-foreground4` - @example `#40b0a6` */
    'scmGraph.foreground4': string;
    /** `--vscode-scmGraph-foreground5` - @example `#b66dff` */
    'scmGraph.foreground5': string;
    /** `--vscode-scmGraph-historyItemBaseRefColor` - @example `#ea5c00` */
    'scmGraph.historyItemBaseRefColor': string;
    /** `--vscode-scmGraph-historyItemHoverAdditionsForeground` - @example `#587c0c` */
    'scmGraph.historyItemHoverAdditionsForeground': string;
    /** `--vscode-scmGraph-historyItemHoverDefaultLabelBackground` - @example `#006b2a` */
    'scmGraph.historyItemHoverDefaultLabelBackground': string;
    /** `--vscode-scmGraph-historyItemHoverDefaultLabelForeground` - @example `#171d17` */
    'scmGraph.historyItemHoverDefaultLabelForeground': string;
    /** `--vscode-scmGraph-historyItemHoverDeletionsForeground` - @example `#ad0707` */
    'scmGraph.historyItemHoverDeletionsForeground': string;
    /** `--vscode-scmGraph-historyItemHoverLabelForeground` - @example `#f5fbf0` */
    'scmGraph.historyItemHoverLabelForeground': string;
    /** `--vscode-scmGraph-historyItemRefColor` - @example `#004c6d` */
    'scmGraph.historyItemRefColor': string;
    /** `--vscode-scmGraph-historyItemRemoteRefColor` - @example `#652d90` */
    'scmGraph.historyItemRemoteRefColor': string;
    /* -- scrollbar (1) -- */
    /** `--vscode-scrollbar-shadow` - @example `#dddddd` */
    'scrollbar.shadow': string;
    /* -- scrollbarSlider (3) -- */
    /** `--vscode-scrollbarSlider-activeBackground` - @example `rgba(62, 74, 62, 0.7)` */
    'scrollbarSlider.activeBackground': string;
    /** `--vscode-scrollbarSlider-background` - @example `rgba(62, 74, 62, 0.4)` */
    'scrollbarSlider.background': string;
    /** `--vscode-scrollbarSlider-hoverBackground` - @example `rgba(62, 74, 62, 0.6)` */
    'scrollbarSlider.hoverBackground': string;
    /* -- search (1) -- */
    /** `--vscode-search-resultsInfoForeground` - @example `#171d17` */
    'search.resultsInfoForeground': string;
    /* -- searchEditor (2) -- */
    /** `--vscode-searchEditor-findMatchBackground` - @example `rgba(192, 238, 192, 0.26)` */
    'searchEditor.findMatchBackground': string;
    /** `--vscode-searchEditor-textInputBorder` - @example `#bdcaba` */
    'searchEditor.textInputBorder': string;
    /* -- selection (1) -- */
    /** `--vscode-selection-background` - @example `rgba(63, 103, 67, 0.3)` */
    'selection.background': string;
    /* -- settings (21) -- */
    /** `--vscode-settings-checkboxBackground` - @example `#dee4da` */
    'settings.checkboxBackground': string;
    /** `--vscode-settings-checkboxBorder` - @example `#6e7a6c` */
    'settings.checkboxBorder': string;
    /** `--vscode-settings-checkboxForeground` - @example `#171d17` */
    'settings.checkboxForeground': string;
    /** `--vscode-settings-dropdownBackground` - @example `#dee4da` */
    'settings.dropdownBackground': string;
    /** `--vscode-settings-dropdownBorder` - @example `#bdcaba` */
    'settings.dropdownBorder': string;
    /** `--vscode-settings-dropdownForeground` - @example `#171d17` */
    'settings.dropdownForeground': string;
    /** `--vscode-settings-dropdownListBorder` - @example `rgba(23, 29, 23, 0.2)` */
    'settings.dropdownListBorder': string;
    /** `--vscode-settings-focusedRowBackground` - @example `rgba(228, 234, 223, 0.6)` */
    'settings.focusedRowBackground': string;
    /** `--vscode-settings-focusedRowBorder` - @example `#006b2a` */
    'settings.focusedRowBorder': string;
    /** `--vscode-settings-headerBorder` - @example `#bdcaba` */
    'settings.headerBorder': string;
    /** `--vscode-settings-headerForeground` - @example `#444444` */
    'settings.headerForeground': string;
    /** `--vscode-settings-modifiedItemIndicator` - @example `#66afe0` */
    'settings.modifiedItemIndicator': string;
    /** `--vscode-settings-numberInputBackground` - @example `#dee4da` */
    'settings.numberInputBackground': string;
    /** `--vscode-settings-numberInputBorder` - @example `#bdcaba` */
    'settings.numberInputBorder': string;
    /** `--vscode-settings-numberInputForeground` - @example `#171d17` */
    'settings.numberInputForeground': string;
    /** `--vscode-settings-rowHoverBackground` - @example `rgba(228, 234, 223, 0.3)` */
    'settings.rowHoverBackground': string;
    /** `--vscode-settings-sashBorder` - @example `#bdcaba` */
    'settings.sashBorder': string;
    /** `--vscode-settings-settingsHeaderHoverForeground` - @example `rgba(68, 68, 68, 0.7)` */
    'settings.settingsHeaderHoverForeground': string;
    /** `--vscode-settings-textInputBackground` - @example `#dee4da` */
    'settings.textInputBackground': string;
    /** `--vscode-settings-textInputBorder` - @example `#bdcaba` */
    'settings.textInputBorder': string;
    /** `--vscode-settings-textInputForeground` - @example `#171d17` */
    'settings.textInputForeground': string;
    /* -- sideBar (4) -- */
    /** `--vscode-sideBar-background` - @example `#f5fbf0` */
    'sideBar.background': string;
    /** `--vscode-sideBar-border` - @example `#bdcaba` */
    'sideBar.border': string;
    /** `--vscode-sideBar-dropBackground` - @example `rgba(0, 107, 42, 0.4)` */
    'sideBar.dropBackground': string;
    /** `--vscode-sideBar-foreground` - @example `#171d17` */
    'sideBar.foreground': string;
    /* -- sideBarActivityBarTop (1) -- */
    /** `--vscode-sideBarActivityBarTop-border` - @example `#bdcaba` */
    'sideBarActivityBarTop.border': string;
    /* -- sideBarSectionHeader (3) -- */
    /** `--vscode-sideBarSectionHeader-background` - @example `#f5fbf0` */
    'sideBarSectionHeader.background': string;
    /** `--vscode-sideBarSectionHeader-border` - @example `#bdcaba` */
    'sideBarSectionHeader.border': string;
    /** `--vscode-sideBarSectionHeader-foreground` - @example `#3e4a3e` */
    'sideBarSectionHeader.foreground': string;
    /* -- sideBarStickyScroll (2) -- */
    /** `--vscode-sideBarStickyScroll-background` - @example `#f5fbf0` */
    'sideBarStickyScroll.background': string;
    /** `--vscode-sideBarStickyScroll-shadow` - @example `#dddddd` */
    'sideBarStickyScroll.shadow': string;
    /* -- sideBarTitle (2) -- */
    /** `--vscode-sideBarTitle-background` - @example `#f5fbf0` */
    'sideBarTitle.background': string;
    /** `--vscode-sideBarTitle-foreground` - @example `#171d17` */
    'sideBarTitle.foreground': string;
    /* -- sideBySideEditor (2) -- */
    /** `--vscode-sideBySideEditor-horizontalBorder` - @example `#bdcaba` */
    'sideBySideEditor.horizontalBorder': string;
    /** `--vscode-sideBySideEditor-verticalBorder` - @example `#bdcaba` */
    'sideBySideEditor.verticalBorder': string;
    /* -- simpleFindWidget (1) -- */
    /** `--vscode-simpleFindWidget-sashBorder` - @example `#c8c8c8` */
    'simpleFindWidget.sashBorder': string;
    /* -- statusBar (10) -- */
    /** `--vscode-statusBar-background` - @example `#e9f0e5` */
    'statusBar.background': string;
    /** `--vscode-statusBar-border` - @example `#bdcaba` */
    'statusBar.border': string;
    /** `--vscode-statusBar-debuggingBackground` - @example `#ba1a1a` */
    'statusBar.debuggingBackground': string;
    /** `--vscode-statusBar-debuggingBorder` - @example `#bdcaba` */
    'statusBar.debuggingBorder': string;
    /** `--vscode-statusBar-debuggingForeground` - @example `#ffffff` */
    'statusBar.debuggingForeground': string;
    /** `--vscode-statusBar-focusBorder` - @example `#171d17` */
    'statusBar.focusBorder': string;
    /** `--vscode-statusBar-foreground` - @example `#171d17` */
    'statusBar.foreground': string;
    /** `--vscode-statusBar-noFolderBackground` - @example `#e9f0e5` */
    'statusBar.noFolderBackground': string;
    /** `--vscode-statusBar-noFolderBorder` - @example `#bdcaba` */
    'statusBar.noFolderBorder': string;
    /** `--vscode-statusBar-noFolderForeground` - @example `#171d17` */
    'statusBar.noFolderForeground': string;
    /* -- statusBarItem (25) -- */
    /** `--vscode-statusBarItem-activeBackground` - @example `rgba(255, 255, 255, 0.18)` */
    'statusBarItem.activeBackground': string;
    /** `--vscode-statusBarItem-compactHoverBackground` - @example `rgba(0, 0, 0, 0.12)` */
    'statusBarItem.compactHoverBackground': string;
    /** `--vscode-statusBarItem-errorBackground` - @example `#550b00` */
    'statusBarItem.errorBackground': string;
    /** `--vscode-statusBarItem-errorForeground` - @example `#ffffff` */
    'statusBarItem.errorForeground': string;
    /** `--vscode-statusBarItem-errorHoverBackground` - @example `#e4eadf` */
    'statusBarItem.errorHoverBackground': string;
    /** `--vscode-statusBarItem-errorHoverForeground` - @example `#171d17` */
    'statusBarItem.errorHoverForeground': string;
    /** `--vscode-statusBarItem-focusBorder` - @example `#171d17` */
    'statusBarItem.focusBorder': string;
    /** `--vscode-statusBarItem-hoverBackground` - @example `#e4eadf` */
    'statusBarItem.hoverBackground': string;
    /** `--vscode-statusBarItem-hoverForeground` - @example `#171d17` */
    'statusBarItem.hoverForeground': string;
    /** `--vscode-statusBarItem-offlineBackground` - @example `#6c1717` */
    'statusBarItem.offlineBackground': string;
    /** `--vscode-statusBarItem-offlineForeground` - @example `#f7fff2` */
    'statusBarItem.offlineForeground': string;
    /** `--vscode-statusBarItem-offlineHoverBackground` - @example `#e4eadf` */
    'statusBarItem.offlineHoverBackground': string;
    /** `--vscode-statusBarItem-offlineHoverForeground` - @example `#171d17` */
    'statusBarItem.offlineHoverForeground': string;
    /** `--vscode-statusBarItem-prominentBackground` - @example `rgba(0, 0, 0, 0.5)` */
    'statusBarItem.prominentBackground': string;
    /** `--vscode-statusBarItem-prominentForeground` - @example `#171d17` */
    'statusBarItem.prominentForeground': string;
    /** `--vscode-statusBarItem-prominentHoverBackground` - @example `#e4eadf` */
    'statusBarItem.prominentHoverBackground': string;
    /** `--vscode-statusBarItem-prominentHoverForeground` - @example `#171d17` */
    'statusBarItem.prominentHoverForeground': string;
    /** `--vscode-statusBarItem-remoteBackground` - @example `#008738` */
    'statusBarItem.remoteBackground': string;
    /** `--vscode-statusBarItem-remoteForeground` - @example `#f7fff2` */
    'statusBarItem.remoteForeground': string;
    /** `--vscode-statusBarItem-remoteHoverBackground` - @example `#e4eadf` */
    'statusBarItem.remoteHoverBackground': string;
    /** `--vscode-statusBarItem-remoteHoverForeground` - @example `#171d17` */
    'statusBarItem.remoteHoverForeground': string;
    /** `--vscode-statusBarItem-warningBackground` - @example `#412300` */
    'statusBarItem.warningBackground': string;
    /** `--vscode-statusBarItem-warningForeground` - @example `#ffffff` */
    'statusBarItem.warningForeground': string;
    /** `--vscode-statusBarItem-warningHoverBackground` - @example `#e4eadf` */
    'statusBarItem.warningHoverBackground': string;
    /** `--vscode-statusBarItem-warningHoverForeground` - @example `#171d17` */
    'statusBarItem.warningHoverForeground': string;
    /* -- surface (3) -- */
    /** `--vscode-surface-background` - @example `#f5fbf0` */
    'surface.background': string;
    /** `--vscode-surface-border` - @example `#d3d9cf` */
    'surface.border': string;
    /** `--vscode-surface-foreground` - @example `#171d17` */
    'surface.foreground': string;
    /* -- symbolIcon (33) -- */
    /** `--vscode-symbolIcon-arrayForeground` - @example `#171d17` */
    'symbolIcon.arrayForeground': string;
    /** `--vscode-symbolIcon-booleanForeground` - @example `#171d17` */
    'symbolIcon.booleanForeground': string;
    /** `--vscode-symbolIcon-classForeground` - @example `#d67e00` */
    'symbolIcon.classForeground': string;
    /** `--vscode-symbolIcon-colorForeground` - @example `#171d17` */
    'symbolIcon.colorForeground': string;
    /** `--vscode-symbolIcon-constantForeground` - @example `#171d17` */
    'symbolIcon.constantForeground': string;
    /** `--vscode-symbolIcon-constructorForeground` - @example `#652d90` */
    'symbolIcon.constructorForeground': string;
    /** `--vscode-symbolIcon-enumeratorForeground` - @example `#d67e00` */
    'symbolIcon.enumeratorForeground': string;
    /** `--vscode-symbolIcon-enumeratorMemberForeground` - @example `#007acc` */
    'symbolIcon.enumeratorMemberForeground': string;
    /** `--vscode-symbolIcon-eventForeground` - @example `#d67e00` */
    'symbolIcon.eventForeground': string;
    /** `--vscode-symbolIcon-fieldForeground` - @example `#007acc` */
    'symbolIcon.fieldForeground': string;
    /** `--vscode-symbolIcon-fileForeground` - @example `#171d17` */
    'symbolIcon.fileForeground': string;
    /** `--vscode-symbolIcon-folderForeground` - @example `#171d17` */
    'symbolIcon.folderForeground': string;
    /** `--vscode-symbolIcon-functionForeground` - @example `#652d90` */
    'symbolIcon.functionForeground': string;
    /** `--vscode-symbolIcon-interfaceForeground` - @example `#007acc` */
    'symbolIcon.interfaceForeground': string;
    /** `--vscode-symbolIcon-keyForeground` - @example `#171d17` */
    'symbolIcon.keyForeground': string;
    /** `--vscode-symbolIcon-keywordForeground` - @example `#171d17` */
    'symbolIcon.keywordForeground': string;
    /** `--vscode-symbolIcon-methodForeground` - @example `#652d90` */
    'symbolIcon.methodForeground': string;
    /** `--vscode-symbolIcon-moduleForeground` - @example `#171d17` */
    'symbolIcon.moduleForeground': string;
    /** `--vscode-symbolIcon-namespaceForeground` - @example `#171d17` */
    'symbolIcon.namespaceForeground': string;
    /** `--vscode-symbolIcon-nullForeground` - @example `#171d17` */
    'symbolIcon.nullForeground': string;
    /** `--vscode-symbolIcon-numberForeground` - @example `#171d17` */
    'symbolIcon.numberForeground': string;
    /** `--vscode-symbolIcon-objectForeground` - @example `#171d17` */
    'symbolIcon.objectForeground': string;
    /** `--vscode-symbolIcon-operatorForeground` - @example `#171d17` */
    'symbolIcon.operatorForeground': string;
    /** `--vscode-symbolIcon-packageForeground` - @example `#171d17` */
    'symbolIcon.packageForeground': string;
    /** `--vscode-symbolIcon-propertyForeground` - @example `#171d17` */
    'symbolIcon.propertyForeground': string;
    /** `--vscode-symbolIcon-referenceForeground` - @example `#171d17` */
    'symbolIcon.referenceForeground': string;
    /** `--vscode-symbolIcon-snippetForeground` - @example `#171d17` */
    'symbolIcon.snippetForeground': string;
    /** `--vscode-symbolIcon-stringForeground` - @example `#171d17` */
    'symbolIcon.stringForeground': string;
    /** `--vscode-symbolIcon-structForeground` - @example `#171d17` */
    'symbolIcon.structForeground': string;
    /** `--vscode-symbolIcon-textForeground` - @example `#171d17` */
    'symbolIcon.textForeground': string;
    /** `--vscode-symbolIcon-typeParameterForeground` - @example `#171d17` */
    'symbolIcon.typeParameterForeground': string;
    /** `--vscode-symbolIcon-unitForeground` - @example `#171d17` */
    'symbolIcon.unitForeground': string;
    /** `--vscode-symbolIcon-variableForeground` - @example `#007acc` */
    'symbolIcon.variableForeground': string;
    /* -- tab (22) -- */
    /** `--vscode-tab-activeBackground` - @example `#008738` */
    'tab.activeBackground': string;
    /** `--vscode-tab-activeBorderTop` - @example `#006b2a` */
    'tab.activeBorderTop': string;
    /** `--vscode-tab-activeForeground` - @example `#f7fff2` */
    'tab.activeForeground': string;
    /** `--vscode-tab-activeModifiedBorder` - @example `#33aaee` */
    'tab.activeModifiedBorder': string;
    /** `--vscode-tab-border` - @example `#bdcaba` */
    'tab.border': string;
    /** `--vscode-tab-dragAndDropBorder` - @example `#f7fff2` */
    'tab.dragAndDropBorder': string;
    /** `--vscode-tab-hoverBackground` - @example `#dee4da` */
    'tab.hoverBackground': string;
    /** `--vscode-tab-inactiveBackground` - @example `#d9e6d6` */
    'tab.inactiveBackground': string;
    /** `--vscode-tab-inactiveForeground` - @example `#3e4a3e` */
    'tab.inactiveForeground': string;
    /** `--vscode-tab-inactiveModifiedBorder` - @example `rgba(51, 170, 238, 0.5)` */
    'tab.inactiveModifiedBorder': string;
    /** `--vscode-tab-lastPinnedBorder` - @example `#a9a9a9` */
    'tab.lastPinnedBorder': string;
    /** `--vscode-tab-selectedBackground` - @example `#e4eadf` */
    'tab.selectedBackground': string;
    /** `--vscode-tab-selectedBorderTop` - @example `#006b2a` */
    'tab.selectedBorderTop': string;
    /** `--vscode-tab-selectedForeground` - @example `#f7fff2` */
    'tab.selectedForeground': string;
    /** `--vscode-tab-unfocusedActiveBackground` - @example `#e9f0e5` */
    'tab.unfocusedActiveBackground': string;
    /** `--vscode-tab-unfocusedActiveBorderTop` - @example `rgba(0, 107, 42, 0.7)` */
    'tab.unfocusedActiveBorderTop': string;
    /** `--vscode-tab-unfocusedActiveForeground` - @example `rgba(247, 255, 242, 0.7)` */
    'tab.unfocusedActiveForeground': string;
    /** `--vscode-tab-unfocusedActiveModifiedBorder` - @example `rgba(51, 170, 238, 0.7)` */
    'tab.unfocusedActiveModifiedBorder': string;
    /** `--vscode-tab-unfocusedHoverBackground` - @example `rgba(222, 228, 218, 0.7)` */
    'tab.unfocusedHoverBackground': string;
    /** `--vscode-tab-unfocusedInactiveBackground` - @example `#d9e6d6` */
    'tab.unfocusedInactiveBackground': string;
    /** `--vscode-tab-unfocusedInactiveForeground` - @example `rgba(62, 74, 62, 0.5)` */
    'tab.unfocusedInactiveForeground': string;
    /** `--vscode-tab-unfocusedInactiveModifiedBorder` - @example `rgba(51, 170, 238, 0.25)` */
    'tab.unfocusedInactiveModifiedBorder': string;
    /* -- terminal (26) -- */
    /** `--vscode-terminal-ansiBlack` - @example `#000000` */
    'terminal.ansiBlack': string;
    /** `--vscode-terminal-ansiBlue` - @example `#0451a5` */
    'terminal.ansiBlue': string;
    /** `--vscode-terminal-ansiBrightBlack` - @example `#666666` */
    'terminal.ansiBrightBlack': string;
    /** `--vscode-terminal-ansiBrightBlue` - @example `#3b8eea` */
    'terminal.ansiBrightBlue': string;
    /** `--vscode-terminal-ansiBrightCyan` - @example `#29b8db` */
    'terminal.ansiBrightCyan': string;
    /** `--vscode-terminal-ansiBrightGreen` - @example `#14ce14` */
    'terminal.ansiBrightGreen': string;
    /** `--vscode-terminal-ansiBrightMagenta` - @example `#d670d6` */
    'terminal.ansiBrightMagenta': string;
    /** `--vscode-terminal-ansiBrightRed` - @example `#f14c4c` */
    'terminal.ansiBrightRed': string;
    /** `--vscode-terminal-ansiBrightWhite` - @example `#a5a5a5` */
    'terminal.ansiBrightWhite': string;
    /** `--vscode-terminal-ansiBrightYellow` - @example `#b5ba00` */
    'terminal.ansiBrightYellow': string;
    /** `--vscode-terminal-ansiCyan` - @example `#0598bc` */
    'terminal.ansiCyan': string;
    /** `--vscode-terminal-ansiGreen` - @example `#107c10` */
    'terminal.ansiGreen': string;
    /** `--vscode-terminal-ansiMagenta` - @example `#bc05bc` */
    'terminal.ansiMagenta': string;
    /** `--vscode-terminal-ansiRed` - @example `#cd3131` */
    'terminal.ansiRed': string;
    /** `--vscode-terminal-ansiWhite` - @example `#555555` */
    'terminal.ansiWhite': string;
    /** `--vscode-terminal-ansiYellow` - @example `#949800` */
    'terminal.ansiYellow': string;
    /** `--vscode-terminal-background` - @example `#f5fbf0` */
    'terminal.background': string;
    /** `--vscode-terminal-border` - @example `#bdcaba` */
    'terminal.border': string;
    /** `--vscode-terminal-dropBackground` - @example `rgba(0, 107, 42, 0.4)` */
    'terminal.dropBackground': string;
    /** `--vscode-terminal-findMatchBackground` - @example `rgba(0, 107, 42, 0.4)` */
    'terminal.findMatchBackground': string;
    /** `--vscode-terminal-findMatchHighlightBackground` - @example `rgba(192, 238, 192, 0.4)` */
    'terminal.findMatchHighlightBackground': string;
    /** `--vscode-terminal-foreground` - @example `#171d17` */
    'terminal.foreground': string;
    /** `--vscode-terminal-hoverHighlightBackground` - @example `rgba(192, 238, 192, 0.2)` */
    'terminal.hoverHighlightBackground': string;
    /** `--vscode-terminal-inactiveSelectionBackground` - @example `rgba(222, 228, 218, 0.5)` */
    'terminal.inactiveSelectionBackground': string;
    /** `--vscode-terminal-initialHintForeground` - @example `rgba(0, 0, 0, 0.47)` */
    'terminal.initialHintForeground': string;
    /** `--vscode-terminal-selectionBackground` - @example `#dee4da` */
    'terminal.selectionBackground': string;
    /* -- terminalCommandDecoration (3) -- */
    /** `--vscode-terminalCommandDecoration-defaultBackground` - @example `rgba(0, 0, 0, 0.25)` */
    'terminalCommandDecoration.defaultBackground': string;
    /** `--vscode-terminalCommandDecoration-errorBackground` - @example `#e51400` */
    'terminalCommandDecoration.errorBackground': string;
    /** `--vscode-terminalCommandDecoration-successBackground` - @example `#2090d3` */
    'terminalCommandDecoration.successBackground': string;
    /* -- terminalCommandGuide (1) -- */
    /** `--vscode-terminalCommandGuide-foreground` - @example `#e4eadf` */
    'terminalCommandGuide.foreground': string;
    /* -- terminalCursor (1) -- */
    /** `--vscode-terminalCursor-foreground` - @example `#006b2a` */
    'terminalCursor.foreground': string;
    /* -- terminalOverviewRuler (3) -- */
    /** `--vscode-terminalOverviewRuler-border` - @example `rgba(127, 127, 127, 0.3)` */
    'terminalOverviewRuler.border': string;
    /** `--vscode-terminalOverviewRuler-cursorForeground` - @example `rgba(160, 160, 160, 0.8)` */
    'terminalOverviewRuler.cursorForeground': string;
    /** `--vscode-terminalOverviewRuler-findMatchForeground` - @example `rgba(209, 134, 22, 0.49)` */
    'terminalOverviewRuler.findMatchForeground': string;
    /* -- terminalStickyScrollHover (1) -- */
    /** `--vscode-terminalStickyScrollHover-background` - @example `#f0f0f0` */
    'terminalStickyScrollHover.background': string;
    /* -- terminalSymbolIcon (18) -- */
    /** `--vscode-terminalSymbolIcon-aliasForeground` - @example `#652d90` */
    'terminalSymbolIcon.aliasForeground': string;
    /** `--vscode-terminalSymbolIcon-argumentForeground` - @example `#007acc` */
    'terminalSymbolIcon.argumentForeground': string;
    /** `--vscode-terminalSymbolIcon-branchForeground` - @example `#171d17` */
    'terminalSymbolIcon.branchForeground': string;
    /** `--vscode-terminalSymbolIcon-commitForeground` - @example `#171d17` */
    'terminalSymbolIcon.commitForeground': string;
    /** `--vscode-terminalSymbolIcon-fileForeground` - @example `#171d17` */
    'terminalSymbolIcon.fileForeground': string;
    /** `--vscode-terminalSymbolIcon-flagForeground` - @example `#d67e00` */
    'terminalSymbolIcon.flagForeground': string;
    /** `--vscode-terminalSymbolIcon-folderForeground` - @example `#171d17` */
    'terminalSymbolIcon.folderForeground': string;
    /** `--vscode-terminalSymbolIcon-methodForeground` - @example `#652d90` */
    'terminalSymbolIcon.methodForeground': string;
    /** `--vscode-terminalSymbolIcon-optionForeground` - @example `#d67e00` */
    'terminalSymbolIcon.optionForeground': string;
    /** `--vscode-terminalSymbolIcon-optionValueForeground` - @example `#007acc` */
    'terminalSymbolIcon.optionValueForeground': string;
    /** `--vscode-terminalSymbolIcon-pullRequestDoneForeground` - @example `#171d17` */
    'terminalSymbolIcon.pullRequestDoneForeground': string;
    /** `--vscode-terminalSymbolIcon-pullRequestForeground` - @example `#171d17` */
    'terminalSymbolIcon.pullRequestForeground': string;
    /** `--vscode-terminalSymbolIcon-remoteForeground` - @example `#171d17` */
    'terminalSymbolIcon.remoteForeground': string;
    /** `--vscode-terminalSymbolIcon-stashForeground` - @example `#171d17` */
    'terminalSymbolIcon.stashForeground': string;
    /** `--vscode-terminalSymbolIcon-symbolText` - @example `#171d17` */
    'terminalSymbolIcon.symbolText': string;
    /** `--vscode-terminalSymbolIcon-symbolicLinkFileForeground` - @example `#171d17` */
    'terminalSymbolIcon.symbolicLinkFileForeground': string;
    /** `--vscode-terminalSymbolIcon-symbolicLinkFolderForeground` - @example `#171d17` */
    'terminalSymbolIcon.symbolicLinkFolderForeground': string;
    /** `--vscode-terminalSymbolIcon-tagForeground` - @example `#171d17` */
    'terminalSymbolIcon.tagForeground': string;
    /* -- testing (32) -- */
    /** `--vscode-testing-coverCountBadgeBackground` - @example `#006b2a` */
    'testing.coverCountBadgeBackground': string;
    /** `--vscode-testing-coverCountBadgeForeground` - @example `#ffffff` */
    'testing.coverCountBadgeForeground': string;
    /** `--vscode-testing-coveredBackground` - @example `rgba(104, 255, 137, 0.6)` */
    'testing.coveredBackground': string;
    /** `--vscode-testing-coveredBorder` - @example `rgba(104, 255, 137, 0.45)` */
    'testing.coveredBorder': string;
    /** `--vscode-testing-coveredGutterBackground` - @example `rgba(104, 255, 137, 0.36)` */
    'testing.coveredGutterBackground': string;
    /** `--vscode-testing-coveredMinimapBackground` - @example `rgba(104, 255, 137, 0.36)` */
    'testing.coveredMinimapBackground': string;
    /** `--vscode-testing-iconErrored` - @example `#8e1400` */
    'testing.iconErrored': string;
    /** `--vscode-testing-iconErrored-retired` - @example `rgba(142, 20, 0, 0.7)` */
    'testing.iconErrored.retired': string;
    /** `--vscode-testing-iconFailed` - @example `#8e1400` */
    'testing.iconFailed': string;
    /** `--vscode-testing-iconFailed-retired` - @example `rgba(142, 20, 0, 0.7)` */
    'testing.iconFailed.retired': string;
    /** `--vscode-testing-iconPassed` - @example `#73c991` */
    'testing.iconPassed': string;
    /** `--vscode-testing-iconPassed-retired` - @example `rgba(115, 201, 145, 0.7)` */
    'testing.iconPassed.retired': string;
    /** `--vscode-testing-iconQueued` - @example `#6c3a00` */
    'testing.iconQueued': string;
    /** `--vscode-testing-iconQueued-retired` - @example `rgba(108, 58, 0, 0.7)` */
    'testing.iconQueued.retired': string;
    /** `--vscode-testing-iconSkipped` - @example `#848484` */
    'testing.iconSkipped': string;
    /** `--vscode-testing-iconSkipped-retired` - @example `rgba(132, 132, 132, 0.7)` */
    'testing.iconSkipped.retired': string;
    /** `--vscode-testing-iconUnset` - @example `#848484` */
    'testing.iconUnset': string;
    /** `--vscode-testing-iconUnset-retired` - @example `rgba(132, 132, 132, 0.7)` */
    'testing.iconUnset.retired': string;
    /** `--vscode-testing-message-error-badgeBackground` - @example `#e51400` */
    'testing.message.error.badgeBackground': string;
    /** `--vscode-testing-message-error-badgeBorder` - @example `#e51400` */
    'testing.message.error.badgeBorder': string;
    /** `--vscode-testing-message-error-badgeForeground` - @example `#ffffff` */
    'testing.message.error.badgeForeground': string;
    /** `--vscode-testing-message-info-decorationForeground` - @example `rgba(23, 29, 23, 0.5)` */
    'testing.message.info.decorationForeground': string;
    /** `--vscode-testing-messagePeekBorder` - @example `#004c6d` */
    'testing.messagePeekBorder': string;
    /** `--vscode-testing-messagePeekHeaderBackground` - @example `rgba(0, 76, 109, 0.1)` */
    'testing.messagePeekHeaderBackground': string;
    /** `--vscode-testing-peekBorder` - @example `#8e1400` */
    'testing.peekBorder': string;
    /** `--vscode-testing-peekHeaderBackground` - @example `rgba(142, 20, 0, 0.1)` */
    'testing.peekHeaderBackground': string;
    /** `--vscode-testing-runAction` - @example `#73c991` */
    'testing.runAction': string;
    /** `--vscode-testing-uncoveredBackground` - @example `rgba(255, 218, 211, 0.6)` */
    'testing.uncoveredBackground': string;
    /** `--vscode-testing-uncoveredBorder` - @example `rgba(255, 218, 211, 0.45)` */
    'testing.uncoveredBorder': string;
    /** `--vscode-testing-uncoveredBranchBackground` - @example `#ffdad3` */
    'testing.uncoveredBranchBackground': string;
    /** `--vscode-testing-uncoveredGutterBackground` - @example `rgba(255, 218, 211, 0.9)` */
    'testing.uncoveredGutterBackground': string;
    /** `--vscode-testing-uncoveredMinimapBackground` - @example `rgba(255, 218, 211, 0.9)` */
    'testing.uncoveredMinimapBackground': string;
    /* -- textBlockQuote (2) -- */
    /** `--vscode-textBlockQuote-background` - @example `#e4eadf` */
    'textBlockQuote.background': string;
    /** `--vscode-textBlockQuote-border` - @example `#bdcaba` */
    'textBlockQuote.border': string;
    /* -- textCodeBlock (1) -- */
    /** `--vscode-textCodeBlock-background` - @example `#ffffff` */
    'textCodeBlock.background': string;
    /* -- textLink (2) -- */
    /** `--vscode-textLink-activeForeground` - @example `#006b2a` */
    'textLink.activeForeground': string;
    /** `--vscode-textLink-foreground` - @example `#006b2a` */
    'textLink.foreground': string;
    /* -- textPreformat (2) -- */
    /** `--vscode-textPreformat-background` - @example `rgba(0, 0, 0, 0.1)` */
    'textPreformat.background': string;
    /** `--vscode-textPreformat-foreground` - @example `#a31515` */
    'textPreformat.foreground': string;
    /* -- textSeparator (1) -- */
    /** `--vscode-textSeparator-foreground` - @example `rgba(0, 0, 0, 0.18)` */
    'textSeparator.foreground': string;
    /* -- titleBar (5) -- */
    /** `--vscode-titleBar-activeBackground` - @example `#e9f0e5` */
    'titleBar.activeBackground': string;
    /** `--vscode-titleBar-activeForeground` - @example `#171d17` */
    'titleBar.activeForeground': string;
    /** `--vscode-titleBar-border` - @example `#bdcaba` */
    'titleBar.border': string;
    /** `--vscode-titleBar-inactiveBackground` - @example `#eff6eb` */
    'titleBar.inactiveBackground': string;
    /** `--vscode-titleBar-inactiveForeground` - @example `#3e4a3e` */
    'titleBar.inactiveForeground': string;
    /* -- toolbar (2) -- */
    /** `--vscode-toolbar-activeBackground` - @example `rgba(166, 166, 166, 0.31)` */
    'toolbar.activeBackground': string;
    /** `--vscode-toolbar-hoverBackground` - @example `rgba(184, 184, 184, 0.31)` */
    'toolbar.hoverBackground': string;
    /* -- tree (4) -- */
    /** `--vscode-tree-inactiveIndentGuidesStroke` - @example `rgba(169, 169, 169, 0.4)` */
    'tree.inactiveIndentGuidesStroke': string;
    /** `--vscode-tree-indentGuidesStroke` - @example `#a9a9a9` */
    'tree.indentGuidesStroke': string;
    /** `--vscode-tree-tableColumnsBorder` - @example `rgba(97, 97, 97, 0.13)` */
    'tree.tableColumnsBorder': string;
    /** `--vscode-tree-tableOddRowsBackground` - @example `rgba(23, 29, 23, 0.04)` */
    'tree.tableOddRowsBackground': string;
    /* -- walkThrough (1) -- */
    /** `--vscode-walkThrough-embeddedEditorBackground` - @example `#f4f4f4` */
    'walkThrough.embeddedEditorBackground': string;
    /* -- walkthrough (1) -- */
    /** `--vscode-walkthrough-stepTitle-foreground` - @example `#000000` */
    'walkthrough.stepTitle.foreground': string;
    /* -- welcomePage (5) -- */
    /** `--vscode-welcomePage-progress-background` - @example `#dee4da` */
    'welcomePage.progress.background': string;
    /** `--vscode-welcomePage-progress-foreground` - @example `#006b2a` */
    'welcomePage.progress.foreground': string;
    /** `--vscode-welcomePage-tileBackground` - @example `#f3f3f3` */
    'welcomePage.tileBackground': string;
    /** `--vscode-welcomePage-tileBorder` - @example `rgba(0, 0, 0, 0.1)` */
    'welcomePage.tileBorder': string;
    /** `--vscode-welcomePage-tileHoverBackground` - @example `#dbdbdb` */
    'welcomePage.tileHoverBackground': string;
    /* -- widget (2) -- */
    /** `--vscode-widget-border` - @example `#bdcaba` */
    'widget.border': string;
    /** `--vscode-widget-shadow` - @example `#000000` */
    'widget.shadow': string;
}

/** All 47 runtime layout token suffixes (raw CSS names, NOT theme IDs). */
export const VSCODE_WORKBENCH_LAYOUT_TOKEN_NAMES = [
    'agents-fontSize-body1',
    'agents-fontSize-body2',
    'agents-fontSize-heading1',
    'agents-fontSize-heading2',
    'agents-fontSize-heading3',
    'agents-fontSize-label1',
    'agents-fontSize-label2',
    'agents-fontSize-label3',
    'agents-fontWeight-regular',
    'agents-fontWeight-semiBold',
    'agents-layout-floatingPanelGap',
    'bodyFontSize',
    'bodyFontSize-small',
    'bodyFontSize-xSmall',
    'codiconFontSize',
    'codiconFontSize-compact',
    'cornerRadius-circle',
    'cornerRadius-large',
    'cornerRadius-medium',
    'cornerRadius-small',
    'cornerRadius-xLarge',
    'cornerRadius-xSmall',
    'fontSize-body1',
    'fontSize-body2',
    'fontSize-heading1',
    'fontSize-heading2',
    'fontSize-heading3',
    'fontSize-label1',
    'fontSize-label2',
    'fontSize-label3',
    'fontWeight-regular',
    'fontWeight-semiBold',
    'spacing-size100',
    'spacing-size120',
    'spacing-size160',
    'spacing-size20',
    'spacing-size200',
    'spacing-size240',
    'spacing-size280',
    'spacing-size320',
    'spacing-size360',
    'spacing-size40',
    'spacing-size400',
    'spacing-size60',
    'spacing-size80',
    'spacing-sizeNone',
    'strokeThickness',
] as const;

/** Union of every runtime layout token suffix (e.g. `spacing-size20`). */
export type VscodeWorkbenchLayoutTokenName = (typeof VSCODE_WORKBENCH_LAYOUT_TOKEN_NAMES)[number];

/** Layout values (`13px`, `400`, ...) keyed by raw CSS suffix. All values are strings
 * as returned by `getPropertyValue`. */
export interface VscodeWorkbenchLayoutTokens {
    /* -- (top-level) (3) -- */
    /** `--vscode-bodyFontSize` - @example `13px` */
    'bodyFontSize': string;
    /** `--vscode-codiconFontSize` - @example `16px` */
    'codiconFontSize': string;
    /** `--vscode-strokeThickness` - @example `1px` */
    'strokeThickness': string;
    /* -- agents (11) -- */
    /** `--vscode-agents-fontSize-body1` - @example `13px` */
    'agents-fontSize-body1': string;
    /** `--vscode-agents-fontSize-body2` - @example `11px` */
    'agents-fontSize-body2': string;
    /** `--vscode-agents-fontSize-heading1` - @example `26px` */
    'agents-fontSize-heading1': string;
    /** `--vscode-agents-fontSize-heading2` - @example `18px` */
    'agents-fontSize-heading2': string;
    /** `--vscode-agents-fontSize-heading3` - @example `13px` */
    'agents-fontSize-heading3': string;
    /** `--vscode-agents-fontSize-label1` - @example `12px` */
    'agents-fontSize-label1': string;
    /** `--vscode-agents-fontSize-label2` - @example `11px` */
    'agents-fontSize-label2': string;
    /** `--vscode-agents-fontSize-label3` - @example `10px` */
    'agents-fontSize-label3': string;
    /** `--vscode-agents-fontWeight-regular` - @example `400` */
    'agents-fontWeight-regular': string;
    /** `--vscode-agents-fontWeight-semiBold` - @example `600` */
    'agents-fontWeight-semiBold': string;
    /** `--vscode-agents-layout-floatingPanelGap` - @example `4px` */
    'agents-layout-floatingPanelGap': string;
    /* -- bodyFontSize (2) -- */
    /** `--vscode-bodyFontSize-small` - @example `12px` */
    'bodyFontSize-small': string;
    /** `--vscode-bodyFontSize-xSmall` - @example `11px` */
    'bodyFontSize-xSmall': string;
    /* -- codiconFontSize (1) -- */
    /** `--vscode-codiconFontSize-compact` - @example `12px` */
    'codiconFontSize-compact': string;
    /* -- cornerRadius (6) -- */
    /** `--vscode-cornerRadius-circle` - @example `9999px` */
    'cornerRadius-circle': string;
    /** `--vscode-cornerRadius-large` - @example `8px` */
    'cornerRadius-large': string;
    /** `--vscode-cornerRadius-medium` - @example `6px` */
    'cornerRadius-medium': string;
    /** `--vscode-cornerRadius-small` - @example `4px` */
    'cornerRadius-small': string;
    /** `--vscode-cornerRadius-xLarge` - @example `12px` */
    'cornerRadius-xLarge': string;
    /** `--vscode-cornerRadius-xSmall` - @example `2px` */
    'cornerRadius-xSmall': string;
    /* -- fontSize (8) -- */
    /** `--vscode-fontSize-body1` - @example `13px` */
    'fontSize-body1': string;
    /** `--vscode-fontSize-body2` - @example `11px` */
    'fontSize-body2': string;
    /** `--vscode-fontSize-heading1` - @example `26px` */
    'fontSize-heading1': string;
    /** `--vscode-fontSize-heading2` - @example `18px` */
    'fontSize-heading2': string;
    /** `--vscode-fontSize-heading3` - @example `13px` */
    'fontSize-heading3': string;
    /** `--vscode-fontSize-label1` - @example `12px` */
    'fontSize-label1': string;
    /** `--vscode-fontSize-label2` - @example `11px` */
    'fontSize-label2': string;
    /** `--vscode-fontSize-label3` - @example `10px` */
    'fontSize-label3': string;
    /* -- fontWeight (2) -- */
    /** `--vscode-fontWeight-regular` - @example `400` */
    'fontWeight-regular': string;
    /** `--vscode-fontWeight-semiBold` - @example `600` */
    'fontWeight-semiBold': string;
    /* -- spacing (14) -- */
    /** `--vscode-spacing-size100` - @example `10px` */
    'spacing-size100': string;
    /** `--vscode-spacing-size120` - @example `12px` */
    'spacing-size120': string;
    /** `--vscode-spacing-size160` - @example `16px` */
    'spacing-size160': string;
    /** `--vscode-spacing-size20` - @example `2px` */
    'spacing-size20': string;
    /** `--vscode-spacing-size200` - @example `20px` */
    'spacing-size200': string;
    /** `--vscode-spacing-size240` - @example `24px` */
    'spacing-size240': string;
    /** `--vscode-spacing-size280` - @example `28px` */
    'spacing-size280': string;
    /** `--vscode-spacing-size320` - @example `32px` */
    'spacing-size320': string;
    /** `--vscode-spacing-size360` - @example `36px` */
    'spacing-size360': string;
    /** `--vscode-spacing-size40` - @example `4px` */
    'spacing-size40': string;
    /** `--vscode-spacing-size400` - @example `40px` */
    'spacing-size400': string;
    /** `--vscode-spacing-size60` - @example `6px` */
    'spacing-size60': string;
    /** `--vscode-spacing-size80` - @example `8px` */
    'spacing-size80': string;
    /** `--vscode-spacing-sizeNone` - @example `0px` */
    'spacing-sizeNone': string;
}

/** Theme color ID -> live CSS variable name (`editor.background` -> `--vscode-editor-background`). */
export function cssVariableName(id: VscodeWorkbenchColorId): string {
    return VSCODE_CSS_VAR_PREFIX + id.replaceAll('.', '-');
}

/** Live CSS variable name -> theme color ID (`--vscode-editor-background` -> `editor.background`).
 * Layout tokens (no dot mapping) are returned by raw suffix. */
export function themeColorIdFor(cssVar: string): string {
    const name = cssVar.startsWith(VSCODE_CSS_VAR_PREFIX)
        ? cssVar.slice(VSCODE_CSS_VAR_PREFIX.length)
        : cssVar;
    return name.replaceAll('-', '.');
}
