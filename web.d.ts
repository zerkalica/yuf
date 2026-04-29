declare namespace $ {

	export class $mol_scroll extends $mol_view {
		tabindex( ): number
		event_scroll( next?: any ): any
		scroll_top( next?: number ): number
		scroll_left( next?: number ): number
		attr( ): ({ 
			'tabindex': ReturnType< $mol_scroll['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			scroll( next?: ReturnType< $mol_scroll['event_scroll'] > ): ReturnType< $mol_scroll['event_scroll'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=scroll.view.tree.d.ts.map
declare namespace $ {

	type $mol_book2_sub__1 = $mol_type_enforce<
		ReturnType< $mol_book2['pages'] >[number]
		,
		$mol_view
	>
	type $mol_book2_sub__2 = $mol_type_enforce<
		ReturnType< $mol_book2['placeholders'] >[number]
		,
		$mol_view
	>
	type $mol_view__title_mol_book2_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['title'] >
	>
	export class $mol_book2 extends $mol_scroll {
		pages_deep( ): readonly($mol_view)[]
		pages( ): ReturnType< $mol_book2['pages_deep'] >
		Placeholder( ): $mol_view
		placeholders( ): readonly($mol_view)[]
		menu_title( ): string
		sub( ): readonly($mol_view)[]
		minimal_width( ): number
		Gap( id: any): $mol_view
	}
	
}

//# sourceMappingURL=book2.view.tree.d.ts.map
declare namespace $ {

	export class $mol_theme_auto extends $mol_plugin {
		dark( ): string
		theme( ): ReturnType< $mol_theme_auto['dark'] >
		light( ): string
		attr( ): ({ 
			'mol_theme': ReturnType< $mol_theme_auto['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=auto.view.tree.d.ts.map
declare namespace $ {

	export class $mol_hotkey extends $mol_plugin {
		keydown( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_hotkey['keydown'] > ): ReturnType< $mol_hotkey['keydown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		key( ): Record<string, any>
		mod_ctrl( ): boolean
		mod_alt( ): boolean
		mod_shift( ): boolean
	}
	
}

//# sourceMappingURL=hotkey.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__dom_name_mol_page_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_2 = $mol_type_enforce<
		ReturnType< $mol_page['title_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_page_3 = $mol_type_enforce<
		ReturnType< $mol_page['tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_mol_page_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__dom_name_mol_page_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_6 = $mol_type_enforce<
		ReturnType< $mol_page['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type __mol_page_7 = $mol_type_enforce<
		Parameters< $mol_page['body_scroll_top'] >[0]
		,
		Parameters< ReturnType< $mol_page['Body'] >['scroll_top'] >[0]
	>
	type $mol_view__sub_mol_page_8 = $mol_type_enforce<
		ReturnType< $mol_page['body'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_scroll__sub_mol_page_9 = $mol_type_enforce<
		ReturnType< $mol_page['body_content'] >
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_view__dom_name_mol_page_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_11 = $mol_type_enforce<
		ReturnType< $mol_page['foot'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_page extends $mol_view {
		tabindex( ): number
		Logo( ): any
		title_content( ): readonly(any)[]
		Title( ): $mol_view
		tools( ): readonly($mol_view_content)[]
		Tools( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		body_scroll_top( next?: ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] > ): ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] >
		body( ): readonly($mol_view)[]
		Body_content( ): $mol_view
		body_content( ): readonly(any)[]
		Body( ): $mol_scroll
		foot( ): readonly($mol_view)[]
		Foot( ): $mol_view
		dom_name( ): string
		attr( ): ({ 
			'tabIndex': ReturnType< $mol_page['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $ {

	export class $mol_ghost extends $mol_view {
		Sub( ): $mol_view
	}
	
}

//# sourceMappingURL=ghost.view.tree.d.ts.map
declare namespace $ {

	export class $mol_follower extends $mol_ghost {
		transform( ): string
		Anchor( ): $mol_view
		align( ): readonly(number)[]
		offset( ): readonly(number)[]
		style( ): ({ 
			'transform': ReturnType< $mol_follower['transform'] >,
		})  & ReturnType< $mol_ghost['style'] >
	}
	
}

//# sourceMappingURL=follower.view.tree.d.ts.map
declare namespace $ {

	type $mol_pop_bubble__content_mol_pop_1 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_content'] >
		,
		ReturnType< $mol_pop_bubble['content'] >
	>
	type $mol_pop_bubble__height_max_mol_pop_2 = $mol_type_enforce<
		ReturnType< $mol_pop['height_max'] >
		,
		ReturnType< $mol_pop_bubble['height_max'] >
	>
	type $mol_follower__offset_mol_pop_3 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_offset'] >
		,
		ReturnType< $mol_follower['offset'] >
	>
	type $mol_follower__align_mol_pop_4 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_align'] >
		,
		ReturnType< $mol_follower['align'] >
	>
	type $mol_follower__Anchor_mol_pop_5 = $mol_type_enforce<
		ReturnType< $mol_pop['Anchor'] >
		,
		ReturnType< $mol_follower['Anchor'] >
	>
	type $mol_follower__Sub_mol_pop_6 = $mol_type_enforce<
		ReturnType< $mol_pop['Bubble'] >
		,
		ReturnType< $mol_follower['Sub'] >
	>
	export class $mol_pop extends $mol_view {
		bubble( ): any
		Anchor( ): any
		bubble_offset( ): readonly(number)[]
		bubble_align( ): readonly(number)[]
		bubble_content( ): readonly($mol_view_content)[]
		height_max( ): number
		Bubble( ): $mol_pop_bubble
		Follower( ): $mol_follower
		showed( next?: boolean ): boolean
		align_vert( ): string
		align_hor( ): string
		align( ): string
		prefer( ): string
		auto( ): readonly(any)[]
		sub( ): readonly(any)[]
		sub_visible( ): readonly(any)[]
	}
	
	export class $mol_pop_bubble extends $mol_view {
		content( ): readonly($mol_view_content)[]
		height_max( ): number
		sub( ): ReturnType< $mol_pop_bubble['content'] >
		style( ): ({ 
			'maxHeight': ReturnType< $mol_pop_bubble['height_max'] >,
		})  & ReturnType< $mol_view['style'] >
		attr( ): ({ 
			'tabindex': number,
			'popover': string,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=pop.view.tree.d.ts.map
declare namespace $ {

	export class $mol_nav extends $mol_plugin {
		event_key( next?: any ): any
		cycle( next?: boolean ): boolean
		mod_ctrl( ): boolean
		mod_shift( ): boolean
		mod_alt( ): boolean
		keys_x( next?: readonly(any)[] ): readonly(any)[]
		keys_y( next?: readonly(any)[] ): readonly(any)[]
		current_x( next?: any ): any
		current_y( next?: any ): any
		event_up( next?: any ): any
		event_down( next?: any ): any
		event_left( next?: any ): any
		event_right( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_nav['event_key'] > ): ReturnType< $mol_nav['event_key'] >,
		})  & ReturnType< $mol_plugin['event'] >
	}
	
}

//# sourceMappingURL=nav.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__mod_ctrl_mol_string_1 = $mol_type_enforce<
		ReturnType< $mol_string['submit_with_ctrl'] >
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type $mol_hotkey__key_mol_string_2 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_string['submit'] > ): ReturnType< $mol_string['submit'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	export class $mol_string extends $mol_view {
		selection_watcher( ): any
		error_report( ): any
		disabled( ): boolean
		value( next?: string ): string
		value_changed( next?: ReturnType< $mol_string['value'] > ): ReturnType< $mol_string['value'] >
		hint( ): string
		hint_visible( ): ReturnType< $mol_string['hint'] >
		spellcheck( ): boolean
		autocomplete_native( ): string
		selection_end( ): number
		selection_start( ): number
		keyboard( ): string
		enter( ): string
		length_max( ): number
		type( next?: string ): string
		event_change( next?: any ): any
		submit_with_ctrl( ): boolean
		submit( next?: any ): any
		Submit( ): $mol_hotkey
		dom_name( ): string
		enabled( ): boolean
		minimal_height( ): number
		autocomplete( ): boolean
		selection( next?: readonly(number)[] ): readonly(number)[]
		auto( ): readonly(any)[]
		field( ): ({ 
			'disabled': ReturnType< $mol_string['disabled'] >,
			'value': ReturnType< $mol_string['value_changed'] >,
			'placeholder': ReturnType< $mol_string['hint_visible'] >,
			'spellcheck': ReturnType< $mol_string['spellcheck'] >,
			'autocomplete': ReturnType< $mol_string['autocomplete_native'] >,
			'selectionEnd': ReturnType< $mol_string['selection_end'] >,
			'selectionStart': ReturnType< $mol_string['selection_start'] >,
			'inputMode': ReturnType< $mol_string['keyboard'] >,
			'enterkeyhint': ReturnType< $mol_string['enter'] >,
		})  & ReturnType< $mol_view['field'] >
		attr( ): ({ 
			'maxlength': ReturnType< $mol_string['length_max'] >,
			'type': ReturnType< $mol_string['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			input( next?: ReturnType< $mol_string['event_change'] > ): ReturnType< $mol_string['event_change'] >,
		})  & ReturnType< $mol_view['event'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=string.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg extends $mol_view {
		dom_name( ): string
		dom_name_space( ): string
		font_size( ): number
		font_family( ): string
		style_size( ): Record<string, any>
	}
	
}

//# sourceMappingURL=svg.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_root extends $mol_svg {
		view_box( ): string
		aspect( ): string
		dom_name( ): string
		attr( ): ({ 
			'viewBox': ReturnType< $mol_svg_root['view_box'] >,
			'preserveAspectRatio': ReturnType< $mol_svg_root['aspect'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=root.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_path extends $mol_svg {
		geometry( ): string
		dom_name( ): string
		attr( ): ({ 
			'd': ReturnType< $mol_svg_path['geometry'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=path.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_path__geometry_mol_icon_1 = $mol_type_enforce<
		ReturnType< $mol_icon['path'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	export class $mol_icon extends $mol_svg_root {
		path( ): string
		Path( ): $mol_svg_path
		view_box( ): string
		minimal_width( ): number
		minimal_height( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_close extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=close.view.tree.d.ts.map
declare namespace $ {

	export class $mol_speck extends $mol_view {
		value( ): any
		theme( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=speck.view.tree.d.ts.map
declare namespace $ {

	type $mol_speck__value_mol_button_1 = $mol_type_enforce<
		ReturnType< $mol_button['error'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	export class $mol_button extends $mol_view {
		event_activate( next?: any ): any
		activate( next?: ReturnType< $mol_button['event_activate'] > ): ReturnType< $mol_button['event_activate'] >
		clicks( next?: any ): any
		event_key_press( next?: any ): any
		key_press( next?: ReturnType< $mol_button['event_key_press'] > ): ReturnType< $mol_button['event_key_press'] >
		disabled( ): boolean
		tab_index( ): number
		hint( ): string
		hint_safe( ): ReturnType< $mol_button['hint'] >
		error( ): string
		enabled( ): boolean
		click( next?: any ): any
		event_click( next?: any ): any
		status( next?: readonly(any)[] ): readonly(any)[]
		event( ): ({ 
			click( next?: ReturnType< $mol_button['activate'] > ): ReturnType< $mol_button['activate'] >,
			dblclick( next?: ReturnType< $mol_button['clicks'] > ): ReturnType< $mol_button['clicks'] >,
			keydown( next?: ReturnType< $mol_button['key_press'] > ): ReturnType< $mol_button['key_press'] >,
		})  & ReturnType< $mol_view['event'] >
		attr( ): ({ 
			'disabled': ReturnType< $mol_button['disabled'] >,
			'role': string,
			'tabindex': ReturnType< $mol_button['tab_index'] >,
			'title': ReturnType< $mol_button['hint_safe'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		Speck( ): $mol_speck
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_typed extends $mol_button {
		minimal_height( ): number
		minimal_width( ): number
	}
	
}

//# sourceMappingURL=typed.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_minor extends $mol_button_typed {
	}
	
}

//# sourceMappingURL=minor.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__style_mol_list_1 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_before'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_mol_list_2 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_after'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $mol_list extends $mol_view {
		gap_before( ): number
		Gap_before( ): $mol_view
		Empty( ): $mol_view
		gap_after( ): number
		Gap_after( ): $mol_view
		rows( ): readonly($mol_view)[]
		render_visible_only( ): boolean
		render_over( ): number
		sub( ): ReturnType< $mol_list['rows'] >
		item_height_min( id: any): number
		item_width_min( id: any): number
		view_window_shift( next?: number ): number
		view_window( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	export class $mol_paragraph extends $mol_view {
		line_height( ): number
		letter_width( ): number
		width_limit( ): number
		row_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=paragraph.view.tree.d.ts.map
declare namespace $ {

	type $mol_paragraph__sub_mol_dimmer_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub_mol_dimmer_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_dimmer extends $mol_paragraph {
		parts( ): readonly($mol_view_content)[]
		string( id: any): string
		haystack( ): string
		needle( ): string
		sub( ): ReturnType< $mol_dimmer['parts'] >
		Low( id: any): $mol_paragraph
		High( id: any): $mol_paragraph
	}
	
}

//# sourceMappingURL=dimmer.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_mol_search_1 = $mol_type_enforce<
		({ 
			escape( next?: ReturnType< $mol_search['clear'] > ): ReturnType< $mol_search['clear'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_nav__keys_y_mol_search_2 = $mol_type_enforce<
		ReturnType< $mol_search['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_search_3 = $mol_type_enforce<
		ReturnType< $mol_search['nav_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_string__value_mol_search_4 = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_search_5 = $mol_type_enforce<
		ReturnType< $mol_search['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__submit_mol_search_6 = $mol_type_enforce<
		ReturnType< $mol_search['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled_mol_search_7 = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__keyboard_mol_search_8 = $mol_type_enforce<
		ReturnType< $mol_search['keyboard'] >
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__enter_mol_search_9 = $mol_type_enforce<
		ReturnType< $mol_search['enter'] >
		,
		ReturnType< $mol_string['enter'] >
	>
	type $mol_button_minor__hint_mol_search_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_search_11 = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_search_12 = $mol_type_enforce<
		ReturnType< $mol_search['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_search_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_list__rows_mol_search_14 = $mol_type_enforce<
		ReturnType< $mol_search['menu_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_search_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_dimmer__haystack_mol_search_16 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_search_17 = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_search_plugins__18 = $mol_type_enforce<
		ReturnType< $mol_pop['plugins'] >[number]
		,
		$mol_plugin
	>
	type $mol_view__sub_mol_search_19 = $mol_type_enforce<
		ReturnType< $mol_search['anchor_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_mol_search_20 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_select'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_search_21 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_search extends $mol_pop {
		clear( next?: any ): any
		Hotkey( ): $mol_hotkey
		nav_components( ): readonly($mol_view)[]
		nav_focused( next?: any ): any
		Nav( ): $mol_nav
		suggests_showed( next?: boolean ): boolean
		query( next?: string ): string
		hint( ): string
		submit( next?: any ): any
		enabled( ): boolean
		keyboard( ): string
		enter( ): string
		bring( ): ReturnType< ReturnType< $mol_search['Query'] >['bring'] >
		Query( ): $mol_string
		Clear_icon( ): $mol_icon_close
		Clear( ): $mol_button_minor
		anchor_content( ): readonly(any)[]
		menu_items( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		suggest_select( id: any, next?: any ): any
		suggest_label( id: any): string
		Suggest_label( id: any): $mol_dimmer
		suggest_content( id: any): readonly($mol_view_content)[]
		suggests( ): readonly(string)[]
		plugins( ): readonly($mol_plugin)[]
		showed( next?: ReturnType< $mol_search['suggests_showed'] > ): ReturnType< $mol_search['suggests_showed'] >
		align_hor( ): string
		Anchor( ): $mol_view
		bubble_content( ): readonly($mol_view_content)[]
		Suggest( id: any): $mol_button_minor
	}
	
}

//# sourceMappingURL=search.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_check_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_check extends $mol_button_minor {
		checked( next?: boolean ): boolean
		aria_checked( ): string
		aria_role( ): string
		Icon( ): any
		title( ): string
		Title( ): $mol_view
		label( ): readonly(any)[]
		attr( ): ({ 
			'mol_check_checked': ReturnType< $mol_check['checked'] >,
			'aria-checked': ReturnType< $mol_check['aria_checked'] >,
			'role': ReturnType< $mol_check['aria_role'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		sub( ): readonly($mol_view_content)[]
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=chevron.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_expand extends $mol_check {
		level_style( ): string
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		Icon( ): $mol_icon_chevron
		level( ): number
		style( ): ({ 
			'paddingLeft': ReturnType< $mol_check_expand['level_style'] >,
		})  & ReturnType< $mol_check['style'] >
		checked( next?: ReturnType< $mol_check_expand['expanded'] > ): ReturnType< $mol_check_expand['expanded'] >
		enabled( ): ReturnType< $mol_check_expand['expandable'] >
	}
	
}

//# sourceMappingURL=expand.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_expand__checked_mol_expander_1 = $mol_type_enforce<
		ReturnType< $mol_expander['expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__expandable_mol_expander_2 = $mol_type_enforce<
		ReturnType< $mol_expander['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__label_mol_expander_3 = $mol_type_enforce<
		ReturnType< $mol_expander['label'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__sub_mol_expander_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_mol_expander_5 = $mol_type_enforce<
		ReturnType< $mol_expander['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_expander extends $mol_list {
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		label( ): readonly(any)[]
		Trigger( ): $mol_check_expand
		Tools( ): any
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_list
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=expander.view.tree.d.ts.map
declare namespace $ {

	type $mol_tag_tree__ids_tags_mol_tag_tree_1 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['ids_tags'] >
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	type $mol_tag_tree__path_mol_tag_tree_2 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_path'] >
		,
		ReturnType< $mol_tag_tree['path'] >
	>
	type $mol_tag_tree__Item_mol_tag_tree_3 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['Item'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__item_title_mol_tag_tree_4 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['item_title'] >
		,
		ReturnType< $mol_tag_tree['item_title'] >
	>
	type $mol_tag_tree__tag_expanded_mol_tag_tree_5 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_expanded'] >
		,
		ReturnType< $mol_tag_tree['tag_expanded'] >
	>
	type $mol_tag_tree__tag_name_mol_tag_tree_6 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_name'] >
		,
		ReturnType< $mol_tag_tree['tag_name'] >
	>
	type $mol_tag_tree_sub__7 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_list'] >[number]
		,
		$mol_view
	>
	type $mol_tag_tree_sub__8 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['item_list'] >[number]
		,
		$mol_view
	>
	type $mol_view__sub_mol_tag_tree_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_expander__expandable_mol_tag_tree_10 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_expander['expandable'] >
	>
	type $mol_expander__expanded_mol_tag_tree_11 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__title_mol_tag_tree_12 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_name'] >
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content_mol_tag_tree_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_tag_tree extends $mol_list {
		tag_list( ): readonly($mol_view)[]
		item_list( ): readonly($mol_view)[]
		item_title( id: any): string
		tag_expanded( id: any, next?: boolean ): boolean
		tag_name( id: any): string
		tag_path( id: any): readonly(string)[]
		Tag_tree( id: any): $mol_tag_tree
		path( ): readonly(string)[]
		ids_tags( ): Record<string, any>
		ids( ): readonly(any)[]
		tags( ): readonly(string)[]
		levels_expanded( ): number
		sub( ): readonly($mol_view)[]
		Item( id: any): $mol_view
		Tag( id: any): $mol_expander
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map
declare namespace $ {

	export class $mol_link extends $mol_view {
		uri_toggle( ): string
		hint( ): string
		hint_safe( ): ReturnType< $mol_link['hint'] >
		target( ): string
		file_name( ): string
		current( ): boolean
		relation( ): string
		event_click( next?: any ): any
		click( next?: ReturnType< $mol_link['event_click'] > ): ReturnType< $mol_link['event_click'] >
		uri( ): string
		dom_name( ): string
		uri_off( ): string
		uri_native( ): any
		external( ): boolean
		attr( ): ({ 
			'href': ReturnType< $mol_link['uri_toggle'] >,
			'title': ReturnType< $mol_link['hint_safe'] >,
			'target': ReturnType< $mol_link['target'] >,
			'download': ReturnType< $mol_link['file_name'] >,
			'mol_link_current': ReturnType< $mol_link['current'] >,
			'rel': ReturnType< $mol_link['relation'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		arg( ): Record<string, any>
		event( ): ({ 
			click( next?: ReturnType< $mol_link['click'] > ): ReturnType< $mol_link['click'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=link.view.tree.d.ts.map
declare namespace $ {

	type $mol_search__query_mol_app_demo_menu_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['filter'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_tag_tree__Item_mol_app_demo_menu_2 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['Option'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__ids_tags_mol_app_demo_menu_3 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['ids_tags'] >
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	type $mol_tag_tree__levels_expanded_mol_app_demo_menu_4 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['levels_expanded'] >
		,
		ReturnType< $mol_tag_tree['levels_expanded'] >
	>
	type $mol_dimmer__haystack_mol_app_demo_menu_5 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['option_title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_app_demo_menu_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_link__arg_mol_app_demo_menu_7 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['option_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_app_demo_menu_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_app_demo_menu extends $mol_page {
		filter( next?: string ): string
		Filter( ): $mol_search
		ids_tags( ): Record<string, any>
		levels_expanded_default( ): number
		levels_expanded( ): ReturnType< $mol_app_demo_menu['levels_expanded_default'] >
		Tree( ): $mol_tag_tree
		option_arg( id: any): Record<string, any>
		option_title( id: any): string
		Option_title( id: any): $mol_dimmer
		names( ): readonly(string)[]
		widget_tags( id: any): readonly(string)[]
		widget_aspects( id: any): readonly(string)[]
		widget_title( id: any): string
		search_start( next?: any ): any
		body( ): readonly(any)[]
		Option( id: any): $mol_link
	}
	
}

//# sourceMappingURL=menu.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_script extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=script.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_script_text extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $ {

	export class $mol_link_source extends $mol_link {
		Icon( ): $mol_icon_script_text
		hint( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=source.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_icon extends $mol_check {
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_brightness_4 extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=4.view.tree.d.ts.map
declare namespace $ {

	export class $mol_lights_toggle extends $mol_check_icon {
		Lights_icon( ): $mol_icon_brightness_4
		lights( next?: boolean ): boolean
		Icon( ): ReturnType< $mol_lights_toggle['Lights_icon'] >
		hint( ): string
		checked( next?: ReturnType< $mol_lights_toggle['lights'] > ): ReturnType< $mol_lights_toggle['lights'] >
	}
	
}

//# sourceMappingURL=toggle.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_information extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=information.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_information_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_forum extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=forum.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_forum_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_open_in_new extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=new.view.tree.d.ts.map
declare namespace $ {

	type $mol_link__uri_mol_embed_native_1 = $mol_type_enforce<
		ReturnType< $mol_embed_native['uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_mol_embed_native_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_embed_native extends $mol_scroll {
		uri( next?: string ): string
		title( ): string
		Fallback( ): $mol_link
		uri_change( next?: any ): any
		dom_name( ): string
		window( ): any
		attr( ): ({ 
			'src': ReturnType< $mol_embed_native['uri'] >,
		})  & ReturnType< $mol_scroll['attr'] >
		sub( ): readonly(any)[]
		message( ): ({ 
			hashchange( next?: ReturnType< $mol_embed_native['uri_change'] > ): ReturnType< $mol_embed_native['uri_change'] >,
		}) 
	}
	
}

//# sourceMappingURL=native.view.tree.d.ts.map
declare namespace $ {

	export class $mol_frame extends $mol_embed_native {
		allow( ): string
		html( ): any
		attr( ): ({ 
			'tabindex': ReturnType< $mol_frame['tabindex'] >,
			'allow': ReturnType< $mol_frame['allow'] >,
			'src': ReturnType< $mol_frame['uri'] >,
			'srcdoc': ReturnType< $mol_frame['html'] >,
		}) 
		fullscreen( ): boolean
		accelerometer( ): boolean
		autoplay( ): boolean
		encription( ): boolean
		gyroscope( ): boolean
		pip( ): boolean
		clipboard_read( ): boolean
		clipboard_write( ): boolean
	}
	
}

//# sourceMappingURL=frame.view.tree.d.ts.map
declare namespace $ {

	type $mol_link__uri_mol_chat_1 = $mol_type_enforce<
		ReturnType< $mol_chat['standalone'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_mol_chat_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_chat_3 = $mol_type_enforce<
		({ 
			'mol_chat': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_chat_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_frame__uri_mol_chat_5 = $mol_type_enforce<
		ReturnType< $mol_chat['embed'] >
		,
		ReturnType< $mol_frame['uri'] >
	>
	type $mol_page__title_mol_chat_6 = $mol_type_enforce<
		ReturnType< $mol_chat['title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_chat_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__Body_mol_chat_8 = $mol_type_enforce<
		ReturnType< $mol_chat['Embed'] >
		,
		ReturnType< $mol_page['Body'] >
	>
	export class $mol_chat extends $mol_link {
		Icon( ): $mol_icon_forum_outline
		title( ): string
		standalone( ): string
		Standalone_icon( ): $mol_icon_open_in_new
		Esternal( ): $mol_link
		Close_icon( ): $mol_icon_close
		Close( ): $mol_link
		embed( ): string
		Embed( ): $mol_frame
		Page( ): $mol_page
		seed( ): string
		opened( ): boolean
		arg( ): ({ 
			'mol_chat': string,
		}) 
		hint( ): ReturnType< $mol_chat['title'] >
		sub( ): readonly(any)[]
		pages( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=chat.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_settings extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=settings.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_icon__checked_mol_app_demo_detail_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['readme'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__hint_mol_app_demo_detail_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon_mol_app_demo_detail_3 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['readme_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_chat__seed_mol_app_demo_detail_4 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['chat_seed'] >
		,
		ReturnType< $mol_chat['seed'] >
	>
	type $mol_speck__value_mol_app_demo_detail_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_link__hint_mol_app_demo_detail_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['edit_hint'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_app_demo_detail_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__uri_mol_app_demo_detail_8 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['edit_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__hint_mol_app_demo_detail_9 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['close_hint'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_app_demo_detail_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_app_demo_detail_11 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['close_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	export class $mol_app_demo_detail extends $mol_page {
		readme( next?: boolean ): boolean
		readme_icon( ): $mol_icon_information_outline
		Readme( ): $mol_check_icon
		chat_pages( ): ReturnType< ReturnType< $mol_app_demo_detail['Chat'] >['pages'] >
		chat_seed( ): string
		Chat( ): $mol_chat
		edit_hint( ): string
		Edit_speck( ): $mol_speck
		Edit_icon( ): $mol_icon_settings
		edit_uri( ): string
		Edit( ): $mol_link
		close_hint( ): string
		Close_icon( ): $mol_icon_close
		close_arg( ): ({ 
			'demo': any,
		}) 
		Close( ): $mol_link
		Demo( ): $mol_view
		description( ): string
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=detail.view.tree.d.ts.map
declare namespace $ {

	export class $mol_example extends $mol_view {
		tags( ): readonly(string)[]
		aspects( ): readonly(string)[]
	}
	
}

//# sourceMappingURL=example.view.tree.d.ts.map
declare namespace $ {

	export class $mol_example_small extends $mol_example {
	}
	
}

//# sourceMappingURL=small.view.tree.d.ts.map
declare namespace $ {

	export class $mol_example_large extends $mol_example {
	}
	
}

//# sourceMappingURL=large.view.tree.d.ts.map
declare namespace $ {

	export class $mol_stack extends $mol_view {
	}
	
}

//# sourceMappingURL=stack.view.tree.d.ts.map
declare namespace $ {

	export class $mol_text_code_token extends $mol_dimmer {
		type( ): string
		attr( ): ({ 
			'mol_text_code_token_type': ReturnType< $mol_text_code_token['type'] >,
		})  & ReturnType< $mol_dimmer['attr'] >
	}
	
	export class $mol_text_code_token_link extends $mol_text_code_token {
		uri( ): string
		dom_name( ): string
		type( ): string
		attr( ): ({ 
			'href': ReturnType< $mol_text_code_token_link['uri'] >,
			'target': string,
		})  & ReturnType< $mol_text_code_token['attr'] >
	}
	
}

//# sourceMappingURL=token.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_text_code_line_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text_code_token__type_mol_text_code_line_2 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_type'] >
		,
		ReturnType< $mol_text_code_token['type'] >
	>
	type $mol_text_code_token__haystack_mol_text_code_line_3 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_text'] >
		,
		ReturnType< $mol_text_code_token['haystack'] >
	>
	type $mol_text_code_token__needle_mol_text_code_line_4 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['highlight'] >
		,
		ReturnType< $mol_text_code_token['needle'] >
	>
	type $mol_text_code_token_link__haystack_mol_text_code_line_5 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_text'] >
		,
		ReturnType< $mol_text_code_token_link['haystack'] >
	>
	type $mol_text_code_token_link__needle_mol_text_code_line_6 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['highlight'] >
		,
		ReturnType< $mol_text_code_token_link['needle'] >
	>
	type $mol_text_code_token_link__uri_mol_text_code_line_7 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_uri'] >
		,
		ReturnType< $mol_text_code_token_link['uri'] >
	>
	export class $mol_text_code_line extends $mol_paragraph {
		numb( ): number
		token_type( id: any): string
		token_text( id: any): string
		highlight( ): string
		token_uri( id: any): string
		text( ): string
		minimal_height( ): number
		numb_showed( ): boolean
		syntax( ): any
		uri_resolve( id: any): string
		Numb( ): $mol_view
		Token( id: any): $mol_text_code_token
		Token_link( id: any): $mol_text_code_token_link
		find_pos( id: any): any
	}
	
}

//# sourceMappingURL=line.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clipboard extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=clipboard.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clipboard_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	type $mol_blob__mol_button_copy_1 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	type $mol_blob__mol_button_copy_2 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	export class $mol_button_copy extends $mol_button_minor {
		text( ): ReturnType< $mol_button_copy['title'] >
		text_blob( next?: $mol_blob ): $mol_blob
		html( ): string
		html_blob( next?: $mol_blob ): $mol_blob
		Icon( ): $mol_icon_clipboard_outline
		title( ): string
		blobs( ): readonly($mol_blob)[]
		data( ): Record<string, any>
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=copy.view.tree.d.ts.map
declare namespace $ {

	type $mol_text_code_line__numb_showed_mol_text_code_1 = $mol_type_enforce<
		ReturnType< $mol_text_code['sidebar_showed'] >
		,
		ReturnType< $mol_text_code_line['numb_showed'] >
	>
	type $mol_text_code_line__numb_mol_text_code_2 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_numb'] >
		,
		ReturnType< $mol_text_code_line['numb'] >
	>
	type $mol_text_code_line__theme_mol_text_code_3 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_theme'] >
		,
		ReturnType< $mol_text_code_line['theme'] >
	>
	type $mol_text_code_line__text_mol_text_code_4 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_text'] >
		,
		ReturnType< $mol_text_code_line['text'] >
	>
	type $mol_text_code_line__syntax_mol_text_code_5 = $mol_type_enforce<
		ReturnType< $mol_text_code['syntax'] >
		,
		ReturnType< $mol_text_code_line['syntax'] >
	>
	type $mol_text_code_line__uri_resolve_mol_text_code_6 = $mol_type_enforce<
		ReturnType< $mol_text_code['uri_resolve'] >
		,
		ReturnType< $mol_text_code_line['uri_resolve'] >
	>
	type $mol_text_code_line__highlight_mol_text_code_7 = $mol_type_enforce<
		ReturnType< $mol_text_code['highlight'] >
		,
		ReturnType< $mol_text_code_line['highlight'] >
	>
	type $mol_list__render_visible_only_mol_text_code_8 = $mol_type_enforce<
		ReturnType< $mol_text_code['render_visible_only'] >
		,
		ReturnType< $mol_list['render_visible_only'] >
	>
	type $mol_list__rows_mol_text_code_9 = $mol_type_enforce<
		ReturnType< $mol_text_code['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__hint_mol_text_code_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['hint'] >
	>
	type $mol_button_copy__text_mol_text_code_11 = $mol_type_enforce<
		ReturnType< $mol_text_code['text_export'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	export class $mol_text_code extends $mol_stack {
		sidebar_showed( ): boolean
		render_visible_only( ): boolean
		row_numb( id: any): number
		row_theme( id: any): string
		row_text( id: any): string
		syntax( ): any
		uri_resolve( id: any): string
		highlight( ): string
		Row( id: any): $mol_text_code_line
		rows( ): readonly(any)[]
		Rows( ): $mol_list
		text_export( ): string
		Copy( ): $mol_button_copy
		attr( ): ({ 
			'mol_text_code_sidebar_showed': ReturnType< $mol_text_code['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		text( ): string
		text_lines( ): readonly(string)[]
		find_pos( id: any): any
		uri_base( ): string
		row_themes( ): readonly(string)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map
declare namespace $ {

	export class $mol_float extends $mol_view {
		style( ): ({ 
			'minHeight': string,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=float.view.tree.d.ts.map
declare namespace $ {

	type $mol_grid_table__sub_mol_grid_1 = $mol_type_enforce<
		ReturnType< $mol_grid['rows'] >
		,
		ReturnType< $mol_grid_table['sub'] >
	>
	type $mol_dimmer__needle_mol_grid_2 = $mol_type_enforce<
		ReturnType< $mol_grid['needle'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_grid_3 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_value'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_grid_row__cells_mol_grid_4 = $mol_type_enforce<
		ReturnType< $mol_grid['head_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_row__minimal_height_mol_grid_5 = $mol_type_enforce<
		ReturnType< $mol_grid['row_height'] >
		,
		ReturnType< $mol_grid_row['minimal_height'] >
	>
	type $mol_grid_row__minimal_width_mol_grid_6 = $mol_type_enforce<
		ReturnType< $mol_grid['minimal_width'] >
		,
		ReturnType< $mol_grid_row['minimal_width'] >
	>
	type $mol_grid_row__cells_mol_grid_7 = $mol_type_enforce<
		ReturnType< $mol_grid['cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_cell__sub_mol_grid_8 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_text'] >
		,
		ReturnType< $mol_grid_cell['sub'] >
	>
	type $mol_grid_number__sub_mol_grid_9 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_number'] >
		,
		ReturnType< $mol_grid_number['sub'] >
	>
	type $mol_float__dom_name_mol_grid_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_float['dom_name'] >
	>
	type $mol_float__sub_mol_grid_11 = $mol_type_enforce<
		ReturnType< $mol_grid['col_head_content'] >
		,
		ReturnType< $mol_float['sub'] >
	>
	type $mol_check_expand__level_mol_grid_12 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_level'] >
		,
		ReturnType< $mol_check_expand['level'] >
	>
	type $mol_check_expand__label_mol_grid_13 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_check_expand__expanded_mol_grid_14 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	export class $mol_grid extends $mol_view {
		rows( ): readonly($mol_view)[]
		Table( ): $mol_grid_table
		head_cells( ): readonly($mol_view)[]
		cells( id: any): readonly($mol_view)[]
		cell_content( id: any): readonly($mol_view_content)[]
		cell_content_text( id: any): ReturnType< $mol_grid['cell_content'] >
		cell_content_number( id: any): ReturnType< $mol_grid['cell_content'] >
		col_head_content( id: any): readonly($mol_view_content)[]
		cell_level( id: any): number
		cell_expanded( id: any, next?: boolean ): boolean
		needle( ): string
		cell_value( id: any): string
		Cell_dimmer( id: any): $mol_dimmer
		row_height( ): number
		row_ids( ): readonly(string[])[]
		row_id( id: any): any
		col_ids( ): readonly(any)[]
		records( ): Record<string, any>
		record( id: any): any
		hierarchy( ): any
		hierarchy_col( ): string
		minimal_width( ): number
		sub( ): readonly(any)[]
		Head( ): $mol_grid_row
		Row( id: any): $mol_grid_row
		Cell( id: any): $mol_view
		cell( id: any): any
		Cell_text( id: any): $mol_grid_cell
		Cell_number( id: any): $mol_grid_number
		Col_head( id: any): $mol_float
		Cell_branch( id: any): $mol_check_expand
		Cell_content( id: any): readonly(any)[]
	}
	
	export class $mol_grid_table extends $mol_list {
	}
	
	export class $mol_grid_row extends $mol_view {
		cells( ): readonly($mol_view)[]
		sub( ): ReturnType< $mol_grid_row['cells'] >
	}
	
	export class $mol_grid_cell extends $mol_view {
		minimal_height( ): number
	}
	
	export class $mol_grid_number extends $mol_grid_cell {
	}
	
}

//# sourceMappingURL=grid.view.tree.d.ts.map
declare namespace $ {

	export class $mol_image extends $mol_view {
		uri( ): string
		title( ): string
		loading( ): string
		decoding( ): string
		cors( ): any
		natural_width( ): number
		natural_height( ): number
		load( next?: any ): any
		dom_name( ): string
		attr( ): Record<string, any> & ReturnType< $mol_view['attr'] >
		event( ): Record<string, any>
		minimal_width( ): number
		minimal_height( ): number
	}
	
}

//# sourceMappingURL=image.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__uri_mol_link_iconed_1 = $mol_type_enforce<
		ReturnType< $mol_link_iconed['icon'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_image__title_mol_link_iconed_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	export class $mol_link_iconed extends $mol_link {
		icon( ): string
		Icon( ): $mol_image
		title( ): ReturnType< $mol_link_iconed['uri'] >
		sub( ): readonly(any)[]
		content( ): readonly(any)[]
		host( ): string
	}
	
}

//# sourceMappingURL=iconed.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_youtube extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__title_mol_embed_service_1 = $mol_type_enforce<
		ReturnType< $mol_embed_service['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_mol_embed_service_2 = $mol_type_enforce<
		ReturnType< $mol_embed_service['video_preview'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_frame__title_mol_embed_service_3 = $mol_type_enforce<
		ReturnType< $mol_embed_service['title'] >
		,
		ReturnType< $mol_frame['title'] >
	>
	type $mol_frame__uri_mol_embed_service_4 = $mol_type_enforce<
		ReturnType< $mol_embed_service['video_embed'] >
		,
		ReturnType< $mol_frame['uri'] >
	>
	export class $mol_embed_service extends $mol_check {
		active( next?: boolean ): boolean
		title( ): string
		video_preview( ): string
		Image( ): $mol_image
		Hint( ): $mol_icon_youtube
		video_embed( ): string
		Frame( ): $mol_frame
		uri( ): string
		video_id( ): string
		checked( next?: ReturnType< $mol_embed_service['active'] > ): ReturnType< $mol_embed_service['active'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=service.view.tree.d.ts.map
declare namespace $ {

	export class $mol_embed_youtube extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map
declare namespace $ {

	export class $mol_embed_rutube extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=rutube.view.tree.d.ts.map
declare namespace $ {

	export class $mol_embed_vklive extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=vklive.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__title_mol_embed_any_1 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_mol_embed_any_2 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_embed_native__title_mol_embed_any_3 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_native['title'] >
	>
	type $mol_embed_native__uri_mol_embed_any_4 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_native['uri'] >
	>
	type $mol_embed_youtube__title_mol_embed_any_5 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_youtube['title'] >
	>
	type $mol_embed_youtube__uri_mol_embed_any_6 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_youtube['uri'] >
	>
	type $mol_embed_rutube__title_mol_embed_any_7 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_rutube['title'] >
	>
	type $mol_embed_rutube__uri_mol_embed_any_8 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_rutube['uri'] >
	>
	type $mol_embed_vklive__title_mol_embed_any_9 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_vklive['title'] >
	>
	type $mol_embed_vklive__uri_mol_embed_any_10 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_vklive['uri'] >
	>
	export class $mol_embed_any extends $mol_view {
		title( ): string
		uri( ): string
		Image( ): $mol_image
		Object( ): $mol_embed_native
		Youtube( ): $mol_embed_youtube
		Rutube( ): $mol_embed_rutube
		Vklive( ): $mol_embed_vklive
	}
	
}

//# sourceMappingURL=any.view.tree.d.ts.map
declare namespace $ {

	type $mol_text__text_mol_text_1 = $mol_type_enforce<
		ReturnType< $mol_text['spoiler_label'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__text_mol_text_2 = $mol_type_enforce<
		ReturnType< $mol_text['spoiler_content'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_paragraph__sub_mol_text_3 = $mol_type_enforce<
		ReturnType< $mol_text['block_content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_text__uri_resolve_mol_text_4 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_5 = $mol_type_enforce<
		ReturnType< $mol_text['quote_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight_mol_text_6 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__auto_scroll_mol_text_7 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text_list__uri_resolve_mol_text_8 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_list['uri_resolve'] >
	>
	type $mol_text_list__type_mol_text_9 = $mol_type_enforce<
		ReturnType< $mol_text['list_type'] >
		,
		ReturnType< $mol_text_list['type'] >
	>
	type $mol_text_list__text_mol_text_10 = $mol_type_enforce<
		ReturnType< $mol_text['list_text'] >
		,
		ReturnType< $mol_text_list['text'] >
	>
	type $mol_text_list__highlight_mol_text_11 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_list['highlight'] >
	>
	type $mol_text_header__minimal_height_mol_text_12 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_text_header['minimal_height'] >
	>
	type $mol_text_header__level_mol_text_13 = $mol_type_enforce<
		ReturnType< $mol_text['header_level'] >
		,
		ReturnType< $mol_text_header['level'] >
	>
	type $mol_text_header__content_mol_text_14 = $mol_type_enforce<
		ReturnType< $mol_text['block_content'] >
		,
		ReturnType< $mol_text_header['content'] >
	>
	type $mol_text_header__arg_mol_text_15 = $mol_type_enforce<
		ReturnType< $mol_text['header_arg'] >
		,
		ReturnType< $mol_text_header['arg'] >
	>
	type $mol_text_code__text_mol_text_16 = $mol_type_enforce<
		ReturnType< $mol_text['pre_text'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__row_themes_mol_text_17 = $mol_type_enforce<
		ReturnType< $mol_text['pre_themes'] >
		,
		ReturnType< $mol_text_code['row_themes'] >
	>
	type $mol_text_code__highlight_mol_text_18 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	type $mol_text_code__uri_resolve_mol_text_19 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_code['uri_resolve'] >
	>
	type $mol_text_code__sidebar_showed_mol_text_20 = $mol_type_enforce<
		ReturnType< $mol_text['pre_sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_view__dom_name_mol_text_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_grid__head_cells_mol_text_22 = $mol_type_enforce<
		ReturnType< $mol_text['table_head_cells'] >
		,
		ReturnType< $mol_grid['head_cells'] >
	>
	type $mol_grid__rows_mol_text_23 = $mol_type_enforce<
		ReturnType< $mol_text['table_rows'] >
		,
		ReturnType< $mol_grid['rows'] >
	>
	type $mol_grid_row__cells_mol_text_24 = $mol_type_enforce<
		ReturnType< $mol_text['table_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_text__auto_scroll_mol_text_25 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text__highlight_mol_text_26 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__uri_resolve_mol_text_27 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_28 = $mol_type_enforce<
		ReturnType< $mol_text['table_cell_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_grid__rows_mol_text_29 = $mol_type_enforce<
		ReturnType< $mol_text['grid_rows'] >
		,
		ReturnType< $mol_grid['rows'] >
	>
	type $mol_grid_row__cells_mol_text_30 = $mol_type_enforce<
		ReturnType< $mol_text['grid_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_text__auto_scroll_mol_text_31 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text__highlight_mol_text_32 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__uri_resolve_mol_text_33 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_34 = $mol_type_enforce<
		ReturnType< $mol_text['grid_cell_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_dimmer__dom_name_mol_text_35 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['dom_name'] >
	>
	type $mol_dimmer__needle_mol_text_36 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_text_37 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_text_span__dom_name_mol_text_38 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_text_span['dom_name'] >
	>
	type $mol_text_span__type_mol_text_39 = $mol_type_enforce<
		ReturnType< $mol_text['line_type'] >
		,
		ReturnType< $mol_text_span['type'] >
	>
	type $mol_text_span__sub_mol_text_40 = $mol_type_enforce<
		ReturnType< $mol_text['line_content'] >
		,
		ReturnType< $mol_text_span['sub'] >
	>
	type $mol_text_code_line__numb_showed_mol_text_41 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code_line['numb_showed'] >
	>
	type $mol_text_code_line__highlight_mol_text_42 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_code_line['highlight'] >
	>
	type $mol_text_code_line__text_mol_text_43 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_text_code_line['text'] >
	>
	type $mol_text_code_line__uri_resolve_mol_text_44 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_code_line['uri_resolve'] >
	>
	type $mol_text_code_line__syntax_mol_text_45 = $mol_type_enforce<
		ReturnType< $mol_text['code_syntax'] >
		,
		ReturnType< $mol_text_code_line['syntax'] >
	>
	type $mol_link_iconed__uri_mol_text_46 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content_mol_text_47 = $mol_type_enforce<
		ReturnType< $mol_text['line_content'] >
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_link_iconed__uri_mol_text_48 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content_mol_text_49 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_embed_any__uri_mol_text_50 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_embed_any['uri'] >
	>
	type $mol_embed_any__title_mol_text_51 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_embed_any['title'] >
	>
	type $mol_expander__label_mol_text_52 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['label'] >
	>
	type $mol_expander__content_mol_text_53 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_text extends $mol_list {
		auto_scroll( ): any
		block_content( id: any): readonly(any)[]
		uri_resolve( id: any): string
		quote_text( id: any): string
		highlight( ): string
		list_type( id: any): string
		list_text( id: any): string
		header_level( id: any): number
		header_arg( id: any): Record<string, any>
		pre_text( id: any): string
		pre_themes( id: any): readonly(string)[]
		code_sidebar_showed( ): boolean
		pre_sidebar_showed( ): ReturnType< $mol_text['code_sidebar_showed'] >
		table_head_cells( id: any): readonly(any)[]
		table_rows( id: any): readonly(any)[]
		table_cells( id: any): readonly(any)[]
		table_cell_text( id: any): string
		grid_rows( id: any): readonly(any)[]
		grid_cells( id: any): readonly(any)[]
		grid_cell_text( id: any): string
		line_text( id: any): string
		line_type( id: any): string
		line_content( id: any): readonly(any)[]
		code_syntax( ): any
		link_uri( id: any): string
		link_host( id: any): string
		spoiler_label( id: any): string
		Spoiler_label( id: any): $mol_text
		spoiler_content( id: any): string
		Spoiler_content( id: any): $mol_text
		uri_base( ): string
		text( ): string
		param( ): string
		flow_tokens( ): readonly(any)[]
		block_text( id: any): string
		auto( ): readonly(any)[]
		Paragraph( id: any): $mol_paragraph
		Quote( id: any): $mol_text
		List( id: any): $mol_text_list
		item_index( id: any): number
		Header( id: any): $mol_text_header
		Pre( id: any): $mol_text_code
		Cut( id: any): $mol_view
		Table( id: any): $mol_grid
		Table_row( id: any): $mol_grid_row
		Table_cell( id: any): $mol_text
		Grid( id: any): $mol_grid
		Grid_row( id: any): $mol_grid_row
		Grid_cell( id: any): $mol_text
		String( id: any): $mol_dimmer
		Span( id: any): $mol_text_span
		Code_line( id: any): $mol_text_code_line
		Link( id: any): $mol_link_iconed
		Link_http( id: any): $mol_link_iconed
		Embed( id: any): $mol_embed_any
		Spoiler( id: any): $mol_expander
	}
	
	type $mol_link__arg_mol_text_header_1 = $mol_type_enforce<
		ReturnType< $mol_text_header['arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__hint_mol_text_header_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_text_header_3 = $mol_type_enforce<
		ReturnType< $mol_text_header['content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_text_header extends $mol_paragraph {
		arg( ): Record<string, any>
		content( ): readonly(any)[]
		Link( ): $mol_link
		level( ): number
		sub( ): readonly(any)[]
	}
	
	export class $mol_text_span extends $mol_paragraph {
		type( ): string
		dom_name( ): string
		attr( ): ({ 
			'mol_text_type': ReturnType< $mol_text_span['type'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $ {

	type $mol_text_list_item__index_mol_text_list_1 = $mol_type_enforce<
		ReturnType< $mol_text_list['item_index'] >
		,
		ReturnType< $mol_text_list_item['index'] >
	>
	type $mol_text_list_item__sub_mol_text_list_2 = $mol_type_enforce<
		ReturnType< $mol_text_list['block_content'] >
		,
		ReturnType< $mol_text_list_item['sub'] >
	>
	export class $mol_text_list extends $mol_text {
		type( ): string
		auto_scroll( ): any
		attr( ): ({ 
			'mol_text_list_type': ReturnType< $mol_text_list['type'] >,
		})  & ReturnType< $mol_text['attr'] >
		Paragraph( id: any): $mol_text_list_item
	}
	
	export class $mol_text_list_item extends $mol_paragraph {
		index( ): number
		attr( ): ({ 
			'mol_text_list_item_index': ReturnType< $mol_text_list_item['index'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_source__uri_mol_app_demo_readme_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['source_link'] >
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_link_source__hint_mol_app_demo_readme_2 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['source_hint'] >
		,
		ReturnType< $mol_link_source['hint'] >
	>
	type $mol_button_minor__hint_mol_app_demo_readme_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_mol_app_demo_readme_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_mol_app_demo_readme_5 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['close'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_text__text_mol_app_demo_readme_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['readme'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__uri_base_mol_app_demo_readme_7 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['uri_base'] >
		,
		ReturnType< $mol_text['uri_base'] >
	>
	type $mol_view__sub_mol_app_demo_readme_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_app_demo_readme extends $mol_page {
		source_link( ): string
		source_hint( ): string
		Source_link( ): $mol_link_source
		Close_icon( ): $mol_icon_close
		close( next?: any ): any
		Close( ): $mol_button_minor
		readme( ): string
		uri_base( next?: string ): string
		Not_found_caption( ): string
		readme_link_template( ): string
		source_link_template( ): string
		repo( ): string
		module( ): readonly(string)[]
		title( ): string
		opened( next?: boolean ): boolean
		tools( ): readonly(any)[]
		Readme( ): $mol_text
		Not_found( ): $mol_view
	}
	
}

//# sourceMappingURL=readme.view.tree.d.ts.map
declare namespace $ {

	export class $mol_status extends $mol_view {
		message( ): string
		status( ): ReturnType< $mol_status['title'] >
		minimal_height( ): number
		minimal_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=status.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_source__uri_mol_app_demo_main_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_main['project_uri'] >
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_text__text_mol_app_demo_main_2 = $mol_type_enforce<
		ReturnType< $mol_app_demo_main['description'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__uri_base_mol_app_demo_main_3 = $mol_type_enforce<
		ReturnType< $mol_app_demo_main['project_uri'] >
		,
		ReturnType< $mol_text['uri_base'] >
	>
	export class $mol_app_demo_main extends $mol_page {
		Lights( ): $mol_lights_toggle
		project_uri( ): string
		Project( ): $mol_link_source
		description( ): string
		Description( ): $mol_text
		minimal_width( ): number
		title( ): string
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=main.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_mol_app_demo_1 = $mol_type_enforce<
		({ 
			F( next?: ReturnType< $mol_app_demo['search_start'] > ): ReturnType< $mol_app_demo['search_start'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_hotkey__mod_ctrl_mol_app_demo_2 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type __mol_app_demo_3 = $mol_type_enforce<
		Parameters< $mol_app_demo['search_start'] >[0]
		,
		Parameters< ReturnType< $mol_app_demo['Menu'] >['search_start'] >[0]
	>
	type $mol_link_source__uri_mol_app_demo_4 = $mol_type_enforce<
		ReturnType< $mol_app_demo['sources_uri'] >
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type __mol_app_demo_5 = $mol_type_enforce<
		Parameters< $mol_app_demo['chat_pages'] >[0]
		,
		Parameters< $mol_app_demo['Detail'] >[0]
	>
	type $mol_app_demo_menu__title_mol_app_demo_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo['menu_title'] >
		,
		ReturnType< $mol_app_demo_menu['title'] >
	>
	type $mol_app_demo_menu__names_mol_app_demo_7 = $mol_type_enforce<
		ReturnType< $mol_app_demo['names'] >
		,
		ReturnType< $mol_app_demo_menu['names'] >
	>
	type $mol_app_demo_menu__widget_tags_mol_app_demo_8 = $mol_type_enforce<
		ReturnType< $mol_app_demo['widget_tags'] >
		,
		ReturnType< $mol_app_demo_menu['widget_tags'] >
	>
	type $mol_app_demo_menu__widget_aspects_mol_app_demo_9 = $mol_type_enforce<
		ReturnType< $mol_app_demo['widget_aspects'] >
		,
		ReturnType< $mol_app_demo_menu['widget_aspects'] >
	>
	type $mol_app_demo_menu__widget_title_mol_app_demo_10 = $mol_type_enforce<
		ReturnType< $mol_app_demo['widget_title'] >
		,
		ReturnType< $mol_app_demo_menu['widget_title'] >
	>
	type $mol_app_demo_menu__tools_mol_app_demo_11 = $mol_type_enforce<
		ReturnType< $mol_app_demo['tools'] >
		,
		ReturnType< $mol_app_demo_menu['tools'] >
	>
	type $mol_app_demo_detail__chat_seed_mol_app_demo_12 = $mol_type_enforce<
		ReturnType< $mol_app_demo['chat_seed'] >
		,
		ReturnType< $mol_app_demo_detail['chat_seed'] >
	>
	type $mol_app_demo_detail__title_mol_app_demo_13 = $mol_type_enforce<
		ReturnType< $mol_app_demo['detail_title'] >
		,
		ReturnType< $mol_app_demo_detail['title'] >
	>
	type $mol_app_demo_detail__description_mol_app_demo_14 = $mol_type_enforce<
		ReturnType< $mol_app_demo['detail_description'] >
		,
		ReturnType< $mol_app_demo_detail['description'] >
	>
	type $mol_app_demo_detail__edit_uri_mol_app_demo_15 = $mol_type_enforce<
		ReturnType< $mol_app_demo['edit_uri'] >
		,
		ReturnType< $mol_app_demo_detail['edit_uri'] >
	>
	type $mol_app_demo_detail__readme_mol_app_demo_16 = $mol_type_enforce<
		ReturnType< $mol_app_demo['readme_page'] >
		,
		ReturnType< $mol_app_demo_detail['readme'] >
	>
	type $mol_app_demo_detail__Demo_mol_app_demo_17 = $mol_type_enforce<
		ReturnType< $mol_app_demo['Demo'] >
		,
		ReturnType< $mol_app_demo_detail['Demo'] >
	>
	type $mol_app_demo_readme__repo_mol_app_demo_18 = $mol_type_enforce<
		ReturnType< $mol_app_demo['repo'] >
		,
		ReturnType< $mol_app_demo_readme['repo'] >
	>
	type $mol_app_demo_readme__opened_mol_app_demo_19 = $mol_type_enforce<
		ReturnType< $mol_app_demo['readme_page'] >
		,
		ReturnType< $mol_app_demo_readme['opened'] >
	>
	type $mol_app_demo_readme__module_mol_app_demo_20 = $mol_type_enforce<
		ReturnType< $mol_app_demo['module'] >
		,
		ReturnType< $mol_app_demo_readme['module'] >
	>
	type $mol_status__sub_mol_app_demo_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_status['sub'] >
	>
	export class $mol_app_demo extends $mol_book2 {
		detail_title( ): string
		Theme( ): $mol_theme_auto
		Search_start( ): $mol_hotkey
		menu_title( ): string
		names( ): readonly(string)[]
		widget_tags( id: any): readonly(string)[]
		widget_aspects( id: any): readonly(string)[]
		widget_title( id: any): string
		search_start( next?: ReturnType< ReturnType< $mol_app_demo['Menu'] >['search_start'] > ): ReturnType< ReturnType< $mol_app_demo['Menu'] >['search_start'] >
		sources_uri( ): string
		Sources( ): $mol_link_source
		Lights( ): $mol_lights_toggle
		tools( ): readonly(any)[]
		chat_seed( id: any): string
		chat_pages( id: any): ReturnType< ReturnType< $mol_app_demo['Detail'] >['chat_pages'] >
		detail_description( ): string
		edit_uri( ): string
		readme_page( next?: boolean ): boolean
		Demo( ): $mol_view
		repo( ): string
		module( ): readonly(string)[]
		detail_empty_prefix( ): string
		selected( ): string
		detail_empty_postfix( ): string
		editor_title( ): ReturnType< $mol_app_demo['detail_title'] >
		meta_bundle_base( ): string
		repo_dict( ): Record<string, any>
		plugins( ): readonly(any)[]
		demo_block_list( ): readonly(any)[]
		Menu( ): $mol_app_demo_menu
		Detail( id: any): $mol_app_demo_detail
		Readme_page( ): $mol_app_demo_readme
		Detail_empty_message( ): $mol_status
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chess_bishop extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=bishop.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chess_king extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=king.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chess_knight extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=knight.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chess_pawn extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=pawn.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chess_queen extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=queen.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chess_rook extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=rook.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_chess_piece extends $mol_icon {
		color( ): string
		Bishop( ): $mol_icon_chess_bishop
		King( ): $mol_icon_chess_king
		Knight( ): $mol_icon_chess_knight
		Pawn( ): $mol_icon_chess_pawn
		Queen( ): $mol_icon_chess_queen
		Rook( ): $mol_icon_chess_rook
		attr( ): ({ 
			'yuf_chess_piece_color': ReturnType< $yuf_chess_piece['color'] >,
		})  & ReturnType< $mol_icon['attr'] >
		type( ): string
		icons( ): Record<string, $mol_icon>
	}
	
}

//# sourceMappingURL=piece.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_undo extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=undo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_restart extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=restart.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_lightbulb extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=lightbulb.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_lightbulb_question extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=question.view.tree.d.ts.map
declare namespace $ {

	type $mol_check__minimal_width_mol_pick_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_width'] >
	>
	type $mol_check__minimal_height_mol_pick_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_height'] >
	>
	type $mol_check__enabled_mol_pick_3 = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_enabled'] >
		,
		ReturnType< $mol_check['enabled'] >
	>
	type $mol_check__checked_mol_pick_4 = $mol_type_enforce<
		ReturnType< $mol_pick['showed'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__clicks_mol_pick_5 = $mol_type_enforce<
		ReturnType< $mol_pick['clicks'] >
		,
		ReturnType< $mol_check['clicks'] >
	>
	type $mol_check__sub_mol_pick_6 = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_content'] >
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_check__hint_mol_pick_7 = $mol_type_enforce<
		ReturnType< $mol_pick['hint'] >
		,
		ReturnType< $mol_check['hint'] >
	>
	export class $mol_pick extends $mol_pop {
		keydown( next?: any ): any
		trigger_enabled( ): boolean
		clicks( next?: any ): any
		trigger_content( ): readonly($mol_view_content)[]
		hint( ): string
		Trigger( ): $mol_check
		event( ): ({ 
			keydown( next?: ReturnType< $mol_pick['keydown'] > ): ReturnType< $mol_pick['keydown'] >,
		})  & ReturnType< $mol_pop['event'] >
		Anchor( ): ReturnType< $mol_pick['Trigger'] >
	}
	
}

//# sourceMappingURL=pick.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_dots_vertical extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=vertical.view.tree.d.ts.map
declare namespace $ {

	type $mol_dimmer__haystack_mol_select_1 = $mol_type_enforce<
		ReturnType< $mol_select['option_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_select_2 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_nav__keys_y_mol_select_3 = $mol_type_enforce<
		ReturnType< $mol_select['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_select_4 = $mol_type_enforce<
		ReturnType< $mol_select['option_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_nav__cycle_mol_select_5 = $mol_type_enforce<
		ReturnType< $mol_select['nav_cycle'] >
		,
		ReturnType< $mol_nav['cycle'] >
	>
	type $mol_list__rows_mol_select_6 = $mol_type_enforce<
		ReturnType< $mol_select['menu_content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_select_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_button_minor__enabled_mol_select_8 = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__event_click_mol_select_9 = $mol_type_enforce<
		ReturnType< $mol_select['event_select'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__sub_mol_select_10 = $mol_type_enforce<
		ReturnType< $mol_select['option_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_select_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_search__query_mol_select_12 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__hint_mol_select_13 = $mol_type_enforce<
		ReturnType< $mol_select['filter_hint'] >
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_search__submit_mol_select_14 = $mol_type_enforce<
		ReturnType< $mol_select['submit'] >
		,
		ReturnType< $mol_search['submit'] >
	>
	type $mol_search__enabled_mol_select_15 = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_search['enabled'] >
	>
	export class $mol_select extends $mol_pick {
		enabled( ): boolean
		event_select( id: any, next?: any ): any
		option_label( id: any): string
		filter_pattern( next?: string ): string
		Option_label( id: any): $mol_dimmer
		option_content( id: any): readonly(any)[]
		no_options_message( ): string
		nav_components( ): readonly($mol_view)[]
		option_focused( next?: any ): any
		nav_cycle( next?: boolean ): boolean
		Nav( ): $mol_nav
		menu_content( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		filter_hint( ): string
		submit( next?: any ): any
		dictionary( next?: Record<string, any> ): Record<string, any>
		options( ): readonly(string)[]
		value( next?: string ): string
		option_label_default( ): string
		Option_row( id: any): $mol_button_minor
		No_options( ): $mol_view
		plugins( ): readonly(any)[]
		hint( ): string
		bubble_content( ): readonly(any)[]
		Filter( ): $mol_search
		Trigger_icon( ): $mol_icon_dots_vertical
		trigger_enabled( ): ReturnType< $mol_select['enabled'] >
	}
	
}

//# sourceMappingURL=select.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_chess_cell extends $mol_button {
		id( ): string
		color( ): string
		hilited( ): boolean
		Sub( ): any
		minimal_width( ): number
		minimal_height( ): number
		attr( ): ({ 
			'yuf_chess_cell_id': ReturnType< $yuf_chess_cell['id'] >,
			'yuf_chess_cell_color': ReturnType< $yuf_chess_cell['color'] >,
			'yuf_chess_cell_hilite': ReturnType< $yuf_chess_cell['hilited'] >,
		})  & ReturnType< $mol_button['attr'] >
		sub( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=cell.view.tree.d.ts.map
declare namespace $ {

	export class $mol_transit extends $mol_ghost {
		animation_name_style( ): string
		reset( next?: any ): any
		style( ): ({ 
			'animationName': ReturnType< $mol_transit['animation_name_style'] >,
		}) 
		event( ): ({ 
			animationend( next?: ReturnType< $mol_transit['reset'] > ): ReturnType< $mol_transit['reset'] >,
		}) 
	}
	
}

//# sourceMappingURL=transit.view.tree.d.ts.map
declare namespace $ {

	type __yuf_chess_board_1 = $mol_type_enforce<
		Parameters< $yuf_chess_board['level'] >[0]
		,
		Parameters< ReturnType< $yuf_chess_board['model'] >['level'] >[0]
	>
	type $yuf_chess_board_label__pending_yuf_chess_board_2 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['pending'] >
		,
		ReturnType< $yuf_chess_board_label['pending'] >
	>
	type $yuf_chess_board_label__title_yuf_chess_board_3 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['active_title'] >
		,
		ReturnType< $yuf_chess_board_label['title'] >
	>
	type $yuf_chess_board_label__content_yuf_chess_board_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_chess_board_label['content'] >
	>
	type $mol_view__sub_yuf_chess_board_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint_yuf_chess_board_6 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['undo_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_yuf_chess_board_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_yuf_chess_board_8 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['undo_event'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled_yuf_chess_board_9 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['undo_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__hint_yuf_chess_board_10 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['reset_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_yuf_chess_board_11 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['reset_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_yuf_chess_board_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_yuf_chess_board_13 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__hint_yuf_chess_board_14 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['help_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_yuf_chess_board_15 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['help_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_yuf_chess_board_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_yuf_chess_board_17 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['help'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_select__Filter_yuf_chess_board_18 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value_yuf_chess_board_19 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['level'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__enabled_yuf_chess_board_20 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['help_enabled'] >
		,
		ReturnType< $mol_select['enabled'] >
	>
	type $mol_select__dictionary_yuf_chess_board_21 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['levels'] >
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_select__hint_yuf_chess_board_22 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['level_title'] >
		,
		ReturnType< $mol_select['hint'] >
	>
	type $yuf_chess_board_toolbar_content__23 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['toolbar_bottom'] >[number]
		,
		$mol_view_content
	>
	type $mol_view__minimal_height_yuf_chess_board_24 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_yuf_chess_board_25 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['toolbar_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_yuf_chess_board_26 = $mol_type_enforce<
		readonly($mol_view_content)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_yuf_chess_board_27 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['left'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_chess_cell__id_yuf_chess_board_28 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['cell_id'] >
		,
		ReturnType< $yuf_chess_cell['id'] >
	>
	type $yuf_chess_cell__hint_yuf_chess_board_29 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['cell_hint'] >
		,
		ReturnType< $yuf_chess_cell['hint'] >
	>
	type $yuf_chess_cell__color_yuf_chess_board_30 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['cell_color'] >
		,
		ReturnType< $yuf_chess_cell['color'] >
	>
	type $yuf_chess_cell__hilited_yuf_chess_board_31 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['hilited'] >
		,
		ReturnType< $yuf_chess_cell['hilited'] >
	>
	type $yuf_chess_cell__enabled_yuf_chess_board_32 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['move_enabled'] >
		,
		ReturnType< $yuf_chess_cell['enabled'] >
	>
	type $yuf_chess_cell__click_yuf_chess_board_33 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['click'] >
		,
		ReturnType< $yuf_chess_cell['click'] >
	>
	type $yuf_chess_cell__Sub_yuf_chess_board_34 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['Cell_piece'] >
		,
		ReturnType< $yuf_chess_cell['Sub'] >
	>
	type $mol_view__sub_yuf_chess_board_35 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['right'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_yuf_chess_board_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_yuf_chess_board_37 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['bottom'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_chess_board_fields_content__38 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['cells'] >[number]
		,
		$mol_view
	>
	type $mol_view__attr_yuf_chess_board_39 = $mol_type_enforce<
		({ 
			'yuf_chess_board_gameover': ReturnType< $yuf_chess_board['gameover'] >,
			'yuf_chess_board_ruler': ReturnType< $yuf_chess_board['ruler_enabled'] >,
		}) 
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_yuf_chess_board_40 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['fields_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_chess_model__moves_str_yuf_chess_board_41 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['moves_str'] >
		,
		ReturnType< $yuf_chess_model['moves_str'] >
	>
	type $yuf_chess_board_piece__type_yuf_chess_board_42 = $mol_type_enforce<
		ReturnType< $yuf_chess_board['piece_type'] >
		,
		ReturnType< $yuf_chess_board_piece['type'] >
	>
	export class $yuf_chess_board extends $mol_view {
		level_easy( ): string
		level_medium( ): string
		level_hard( ): string
		level_hardest( ): string
		level_nightmare( ): string
		level( next?: ReturnType< ReturnType< $yuf_chess_board['model'] >['level'] > ): ReturnType< ReturnType< $yuf_chess_board['model'] >['level'] >
		moves_str( next?: string ): string
		pending( ): boolean
		move_title( ): string
		active_title( ): ReturnType< $yuf_chess_board['move_title'] >
		active_value( ): ReturnType< $yuf_chess_board['active_value_white'] >
		Active_field( ): $yuf_chess_board_label
		score_value( next?: string ): string
		Score_field( ): $mol_view
		undo_title( ): string
		undo_icon( ): $mol_icon_undo
		undo_event( next?: any ): any
		undo_enabled( ): boolean
		Undo( ): $mol_button_minor
		reset_title( ): string
		reset_enabled( ): boolean
		Reset_icon( ): $mol_icon_restart
		reset( next?: any ): any
		Reset( ): $mol_button_minor
		help_title( ): string
		help_enabled( ): boolean
		Help_icon( ): $mol_icon_lightbulb_question
		help( next?: any ): any
		Help( ): $mol_button_minor
		level_title( ): string
		Level( ): $mol_select
		toolbar_bottom( ): readonly($mol_view_content)[]
		toolbar_content( ): readonly($mol_view_content)[]
		Toolbar( ): $mol_view
		gameover( ): string
		ruler_enabled( ): boolean
		y_name( id: any): string
		Y_rule( id: any): $mol_view
		left( ): readonly($mol_view)[]
		Left( ): $mol_view
		cell_id( id: any): string
		cell_hint( id: any): string
		cell_color( id: any): string
		hilited( id: any): boolean
		move_enabled( id: any): boolean
		click( id: any, next?: any ): any
		Cell_piece( id: any): any
		Cell( id: any): $yuf_chess_cell
		cells( ): readonly(any)[]
		right( ): readonly($mol_view)[]
		Right( ): $mol_view
		x_name( id: any): string
		X_rule( id: any): $mol_view
		bottom( ): readonly($mol_view)[]
		Bottom( ): $mol_view
		fields_content( ): readonly($mol_view)[]
		Fields( ): $mol_view
		rows( ): readonly(any)[]
		piece_type( id: any): string
		active_value_black( ): string
		active_value_white( ): string
		win_title( ): string
		draw_title( ): string
		levels( ): Record<string, string>
		model( ): $yuf_chess_model
		sub( ): ReturnType< $yuf_chess_board['rows'] >
		Piece( id: any): $yuf_chess_board_piece
	}
	
	type $yuf_chess_piece__type_yuf_chess_board_piece_1 = $mol_type_enforce<
		ReturnType< $yuf_chess_board_piece['type'] >
		,
		ReturnType< $yuf_chess_piece['type'] >
	>
	export class $yuf_chess_board_piece extends $mol_transit {
		type( ): string
		Icon( ): $yuf_chess_piece
		Sub( ): ReturnType< $yuf_chess_board_piece['Icon'] >
	}
	
	type $mol_view__minimal_height_yuf_chess_board_label_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_yuf_chess_board_label_2 = $mol_type_enforce<
		ReturnType< $yuf_chess_board_label['label'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_yuf_chess_board_label_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_yuf_chess_board_label_4 = $mol_type_enforce<
		ReturnType< $yuf_chess_board_label['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $yuf_chess_board_label extends $mol_view {
		pending( ): boolean
		title( ): string
		label( ): readonly($mol_view_content)[]
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_view
		rows( ): readonly($mol_view)[]
		attr( ): ({ 
			'yuf_chess_board_label_pending': ReturnType< $yuf_chess_board_label['pending'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): ReturnType< $yuf_chess_board_label['rows'] >
	}
	
}

//# sourceMappingURL=board.view.tree.d.ts.map
declare namespace $ {

	type $yuf_chess_model_stockfish__moves_str_yuf_chess_demo_1 = $mol_type_enforce<
		ReturnType< $yuf_chess_demo['moves_str'] >
		,
		ReturnType< $yuf_chess_model_stockfish['moves_str'] >
	>
	type $yuf_chess_board__model_yuf_chess_demo_2 = $mol_type_enforce<
		ReturnType< $yuf_chess_demo['chess_model'] >
		,
		ReturnType< $yuf_chess_board['model'] >
	>
	export class $yuf_chess_demo extends $mol_example_small {
		moves_str( next?: string ): string
		chess_model( ): $yuf_chess_model_stockfish
		Chess_board( ): $yuf_chess_board
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_keyboard extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=keyboard.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_keyboard_check extends $mol_check_icon {
		tabindex( ): number
		attr( ): ({ 
			'tabindex': ReturnType< $yuf_keyboard_check['tabindex'] >,
		})  & ReturnType< $mol_check_icon['attr'] >
		Icon( ): $mol_icon_keyboard
		Input( ): $mol_view
		Target( next?: any ): any
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_keyboard_layout_en extends $mol_view {
		lang_key( ): string
		before_space( ): readonly(string)[]
		controls( ): readonly(any)[]
		alpha3_end( ): readonly(any)[]
		special_4_end( ): readonly(any)[]
		variants( ): Record<string, string[][]>
		digits( ): readonly(any)[]
		alpha_1( ): readonly(any)[]
		alpha_2( ): readonly(any)[]
		alpha_3( ): readonly(any)[]
		special_1( ): readonly(any)[]
		special_2( ): readonly(any)[]
		special_3( ): readonly(any)[]
		special_4( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=en.view.tree.d.ts.map
declare namespace $ {

	type $yuf_keyboard_layout_ru_before_space__1 = $mol_type_enforce<
		`Х`
		,
		string
	>
	type $yuf_keyboard_layout_ru_before_space__2 = $mol_type_enforce<
		`Ъ`
		,
		string
	>
	type $yuf_keyboard_layout_ru_before_space__3 = $mol_type_enforce<
		`Э`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__4 = $mol_type_enforce<
		`Й`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__5 = $mol_type_enforce<
		`Ц`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__6 = $mol_type_enforce<
		`У`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__7 = $mol_type_enforce<
		`К`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__8 = $mol_type_enforce<
		`Е`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__9 = $mol_type_enforce<
		`Н`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__10 = $mol_type_enforce<
		`Г`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__11 = $mol_type_enforce<
		`Ш`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__12 = $mol_type_enforce<
		`Щ`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_1__13 = $mol_type_enforce<
		`З`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__14 = $mol_type_enforce<
		`Ф`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__15 = $mol_type_enforce<
		`Ы`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__16 = $mol_type_enforce<
		`В`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__17 = $mol_type_enforce<
		`А`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__18 = $mol_type_enforce<
		`П`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__19 = $mol_type_enforce<
		`Р`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__20 = $mol_type_enforce<
		`О`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__21 = $mol_type_enforce<
		`Л`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__22 = $mol_type_enforce<
		`Д`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_2__23 = $mol_type_enforce<
		`Ж`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__24 = $mol_type_enforce<
		`Я`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__25 = $mol_type_enforce<
		`Ч`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__26 = $mol_type_enforce<
		`С`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__27 = $mol_type_enforce<
		`М`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__28 = $mol_type_enforce<
		`И`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__29 = $mol_type_enforce<
		`Т`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__30 = $mol_type_enforce<
		`Ь`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__31 = $mol_type_enforce<
		`Б`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__32 = $mol_type_enforce<
		`Ю`
		,
		string
	>
	type $yuf_keyboard_layout_ru_alpha_3__33 = $mol_type_enforce<
		`Ё`
		,
		string
	>
	export class $yuf_keyboard_layout_ru extends $yuf_keyboard_layout_en {
		before_space( ): readonly(string)[]
		alpha_1( ): readonly(string)[]
		alpha_2( ): readonly(string)[]
		alpha_3( ): readonly(string)[]
	}
	
}

//# sourceMappingURL=ru.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_keyboard_cell extends $mol_view {
		width_mul( ): any
		start( next?: any ): any
		end( next?: any ): any
		abort( next?: any ): any
		symbol( ): string
		title( ): ReturnType< $yuf_keyboard_cell['symbol'] >
		input( next?: any ): any
		upcase( ): boolean
		style( ): ({ 
			'--yuf_keyboard_cell_width_mul': ReturnType< $yuf_keyboard_cell['width_mul'] >,
		})  & ReturnType< $mol_view['style'] >
		event( ): ({ 
			pointerdown( next?: ReturnType< $yuf_keyboard_cell['start'] > ): ReturnType< $yuf_keyboard_cell['start'] >,
			pointerup( next?: ReturnType< $yuf_keyboard_cell['end'] > ): ReturnType< $yuf_keyboard_cell['end'] >,
			pointercancel( next?: ReturnType< $yuf_keyboard_cell['abort'] > ): ReturnType< $yuf_keyboard_cell['abort'] >,
		})  & ReturnType< $mol_view['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=cell.view.tree.d.ts.map
declare namespace $ {

	type $yuf_keyboard_cell__symbol_yuf_keyboard_row_1 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_row['cell_symbol'] >
		,
		ReturnType< $yuf_keyboard_cell['symbol'] >
	>
	type $yuf_keyboard_cell__input_yuf_keyboard_row_2 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_row['cell_input'] >
		,
		ReturnType< $yuf_keyboard_cell['input'] >
	>
	type $yuf_keyboard_cell__upcase_yuf_keyboard_row_3 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_row['upcase'] >
		,
		ReturnType< $yuf_keyboard_cell['upcase'] >
	>
	type $yuf_keyboard_cell__width_mul_yuf_keyboard_row_4 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_row['width_mul'] >
		,
		ReturnType< $yuf_keyboard_cell['width_mul'] >
	>
	export class $yuf_keyboard_row extends $mol_view {
		cell_symbol( id: any): string
		cell_input( id: any, next?: any ): any
		upcase( ): boolean
		width_mul( id: any): any
		Cell( id: any): $yuf_keyboard_cell
		cells( ): readonly(any)[]
		layout( ): readonly(string)[]
		input( next?: any ): any
		max_buttons( ): number
		lang_next( ): string
		sub( ): ReturnType< $yuf_keyboard_row['cells'] >
	}
	
}

//# sourceMappingURL=row.view.tree.d.ts.map
declare namespace $ {

	type $yuf_keyboard_row__max_buttons_yuf_keyboard_card_1 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_card['max_buttons'] >
		,
		ReturnType< $yuf_keyboard_row['max_buttons'] >
	>
	type $yuf_keyboard_row__layout_yuf_keyboard_card_2 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_card['row_layout'] >
		,
		ReturnType< $yuf_keyboard_row['layout'] >
	>
	type $yuf_keyboard_row__input_yuf_keyboard_card_3 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_card['row_input'] >
		,
		ReturnType< $yuf_keyboard_row['input'] >
	>
	type $yuf_keyboard_row__upcase_yuf_keyboard_card_4 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_card['upcase'] >
		,
		ReturnType< $yuf_keyboard_row['upcase'] >
	>
	type $yuf_keyboard_row__lang_next_yuf_keyboard_card_5 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_card['lang_next'] >
		,
		ReturnType< $yuf_keyboard_row['lang_next'] >
	>
	export class $yuf_keyboard_card extends $mol_view {
		Layout_en( ): $yuf_keyboard_layout_en
		Layout_ru( ): $yuf_keyboard_layout_ru
		max_buttons( ): number
		row_layout( id: any): readonly(string)[]
		row_input( id: any, next?: any ): any
		upcase( next?: boolean ): boolean
		lang_next( ): string
		Row( id: any): $yuf_keyboard_row
		rows( ): readonly(any)[]
		layout( next?: string ): string
		variant( next?: string ): string
		area( ): $mol_view
		layouts( ): Record<string, $yuf_keyboard_layout_en>
		sub( ): ReturnType< $yuf_keyboard_card['rows'] >
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map
declare namespace $ {

	type $yuf_keyboard_check__checked_yuf_keyboard_field_1 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_field['keyboard_enabled'] >
		,
		ReturnType< $yuf_keyboard_check['checked'] >
	>
	type $mol_view__sub_yuf_keyboard_field_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type __yuf_keyboard_field_3 = $mol_type_enforce<
		Parameters< $yuf_keyboard_field['input_focused'] >[0]
		,
		Parameters< ReturnType< $yuf_keyboard_field['Input'] >['focused'] >[0]
	>
	type $yuf_keyboard_card__layouts_yuf_keyboard_field_4 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_field['layouts'] >
		,
		ReturnType< $yuf_keyboard_card['layouts'] >
	>
	type $yuf_keyboard_card__area_yuf_keyboard_field_5 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_field['Input'] >
		,
		ReturnType< $yuf_keyboard_card['area'] >
	>
	export class $yuf_keyboard_field extends $mol_view {
		Control( ): $mol_view
		keyboard_enabled( next?: boolean ): boolean
		Trigger( ): $yuf_keyboard_check
		trigger_content( ): readonly(any)[]
		First( ): $mol_view
		Layout_en( ): $yuf_keyboard_layout_en
		Layout_ru( ): $yuf_keyboard_layout_ru
		layouts( ): Record<string, $yuf_keyboard_layout_en>
		input_focused( next?: ReturnType< ReturnType< $yuf_keyboard_field['Input'] >['focused'] > ): ReturnType< ReturnType< $yuf_keyboard_field['Input'] >['focused'] >
		Input( ): $mol_view
		Keyboard( ): $yuf_keyboard_card
		keyboard_content( ): readonly(any)[]
		trigger_enabled( ): boolean
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__minimal_height_mol_labeler_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_labeler_2 = $mol_type_enforce<
		ReturnType< $mol_labeler['label'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_mol_labeler_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_labeler_4 = $mol_type_enforce<
		ReturnType< $mol_labeler['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_labeler extends $mol_list {
		label( ): readonly($mol_view_content)[]
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_view
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=labeler.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_form_field_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_form_field extends $mol_labeler {
		name( ): string
		bid( ): string
		Bid( ): $mol_view
		control( ): any
		bids( ): readonly(string)[]
		label( ): readonly(any)[]
		content( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_eye extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=eye.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__type_mol_password_1 = $mol_type_enforce<
		ReturnType< $mol_password['type'] >
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_string__hint_mol_password_2 = $mol_type_enforce<
		ReturnType< $mol_password['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_password_3 = $mol_type_enforce<
		ReturnType< $mol_password['value'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__submit_mol_password_4 = $mol_type_enforce<
		ReturnType< $mol_password['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled_mol_password_5 = $mol_type_enforce<
		ReturnType< $mol_password['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_check_icon__checked_mol_password_6 = $mol_type_enforce<
		ReturnType< $mol_password['checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon_mol_password_7 = $mol_type_enforce<
		ReturnType< $mol_password['Show_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	export class $mol_password extends $mol_view {
		hint( ): string
		value( next?: string ): string
		submit( next?: any ): any
		enabled( ): boolean
		Pass( ): $mol_string
		checked( next?: boolean ): boolean
		Show_icon( ): $mol_icon_eye
		Show( ): $mol_check_icon
		content( ): readonly(any)[]
		type( next?: string ): string
		sub( ): ReturnType< $mol_password['content'] >
	}
	
}

//# sourceMappingURL=password.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_major extends $mol_button_minor {
		theme( ): string
	}
	
}

//# sourceMappingURL=major.view.tree.d.ts.map
declare namespace $ {

	export class $mol_row extends $mol_view {
	}
	
}

//# sourceMappingURL=row.view.tree.d.ts.map
declare namespace $ {

	type $mol_list__sub_mol_form_1 = $mol_type_enforce<
		ReturnType< $mol_form['body'] >
		,
		ReturnType< $mol_list['sub'] >
	>
	type __mol_form_2 = $mol_type_enforce<
		Parameters< $mol_form['submit_activate'] >[0]
		,
		Parameters< ReturnType< $mol_form['Submit'] >['activate'] >[0]
	>
	type $mol_button_major__title_mol_form_3 = $mol_type_enforce<
		ReturnType< $mol_form['submit_title'] >
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__hint_mol_form_4 = $mol_type_enforce<
		ReturnType< $mol_form['submit_hint'] >
		,
		ReturnType< $mol_button_major['hint'] >
	>
	type $mol_button_major__click_mol_form_5 = $mol_type_enforce<
		ReturnType< $mol_form['submit'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_status__message_mol_form_6 = $mol_type_enforce<
		ReturnType< $mol_form['result'] >
		,
		ReturnType< $mol_status['message'] >
	>
	type $mol_row__sub_mol_form_7 = $mol_type_enforce<
		ReturnType< $mol_form['foot'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_form extends $mol_list {
		keydown( next?: any ): any
		form_invalid( ): string
		form_fields( ): readonly($mol_form_field)[]
		body( ): ReturnType< $mol_form['form_fields'] >
		Body( ): $mol_list
		submit_title( ): string
		submit_hint( ): string
		submit_activate( next?: ReturnType< ReturnType< $mol_form['Submit'] >['activate'] > ): ReturnType< ReturnType< $mol_form['Submit'] >['activate'] >
		submit( next?: any ): any
		Submit( ): $mol_button_major
		result( next?: any ): any
		Result( ): $mol_status
		buttons( ): readonly($mol_view)[]
		foot( ): ReturnType< $mol_form['buttons'] >
		Foot( ): $mol_row
		submit_allowed( ): boolean
		submit_blocked( ): boolean
		event( ): ({ 
			keydown( next?: ReturnType< $mol_form['keydown'] > ): ReturnType< $mol_form['keydown'] >,
		})  & ReturnType< $mol_list['event'] >
		save( next?: any ): any
		message_done( ): string
		errors( ): Record<string, string>
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_yuf_keyboard_demo_1 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_demo['username'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $yuf_keyboard_field__trigger_enabled_yuf_keyboard_demo_2 = $mol_type_enforce<
		boolean
		,
		ReturnType< $yuf_keyboard_field['trigger_enabled'] >
	>
	type $yuf_keyboard_field__Input_yuf_keyboard_demo_3 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_demo['Username'] >
		,
		ReturnType< $yuf_keyboard_field['Input'] >
	>
	type $mol_form_field__name_yuf_keyboard_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_keyboard_demo_5 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_demo['Username_keyboard'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_password__value_yuf_keyboard_demo_6 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_demo['password'] >
		,
		ReturnType< $mol_password['value'] >
	>
	type $yuf_keyboard_field__Input_yuf_keyboard_demo_7 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_demo['Password_input'] >
		,
		ReturnType< $yuf_keyboard_field['Input'] >
	>
	type $yuf_keyboard_field__Control_yuf_keyboard_demo_8 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_demo['Password'] >
		,
		ReturnType< $yuf_keyboard_field['Control'] >
	>
	type $mol_form_field__name_yuf_keyboard_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_keyboard_demo_10 = $mol_type_enforce<
		ReturnType< $yuf_keyboard_demo['Password_keyboard'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_form__body_yuf_keyboard_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['body'] >
	>
	export class $yuf_keyboard_demo extends $mol_example_small {
		username( next?: string ): string
		Username( ): $mol_string
		Username_keyboard( ): $yuf_keyboard_field
		Username_label( ): $mol_form_field
		Password_input( ): ReturnType< ReturnType< $yuf_keyboard_demo['Password'] >['Pass'] >
		password( next?: string ): string
		Password( ): $mol_password
		Password_keyboard( ): $yuf_keyboard_field
		Password_label( ): $mol_form_field
		Form( ): $mol_form
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_attachment extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=attachment.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_upload extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=upload.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_open_native__files_mol_button_open_1 = $mol_type_enforce<
		ReturnType< $mol_button_open['files_handled'] >
		,
		ReturnType< $mol_button_open_native['files'] >
	>
	type $mol_button_open_native__accept_mol_button_open_2 = $mol_type_enforce<
		ReturnType< $mol_button_open['accept'] >
		,
		ReturnType< $mol_button_open_native['accept'] >
	>
	type $mol_button_open_native__multiple_mol_button_open_3 = $mol_type_enforce<
		ReturnType< $mol_button_open['multiple'] >
		,
		ReturnType< $mol_button_open_native['multiple'] >
	>
	export class $mol_button_open extends $mol_button_minor {
		Icon( ): $mol_icon_upload
		files( next?: readonly(File)[] ): readonly(File)[]
		files_handled( next?: ReturnType< $mol_button_open['files'] > ): ReturnType< $mol_button_open['files'] >
		accept( ): string
		multiple( ): boolean
		Native( ): $mol_button_open_native
		sub( ): readonly(any)[]
	}
	
	export class $mol_button_open_native extends $mol_view {
		accept( ): string
		multiple( ): boolean
		picked( next?: any ): any
		dom_name( ): string
		files( next?: readonly(File)[] ): readonly(File)[]
		attr( ): ({ 
			'type': string,
			'accept': ReturnType< $mol_button_open_native['accept'] >,
			'multiple': ReturnType< $mol_button_open_native['multiple'] >,
		}) 
		event( ): ({ 
			change( next?: ReturnType< $mol_button_open_native['picked'] > ): ReturnType< $mol_button_open_native['picked'] >,
		}) 
	}
	
}

//# sourceMappingURL=open.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_camera extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=camera.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_stop extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=stop.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_pause extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=pause.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_record extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=record.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_record_rec extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=rec.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_camera_recorder_icon extends $mol_icon {
		Inactive( ): $mol_icon_stop
		Paused( ): $mol_icon_pause
		Recording( ): $mol_icon_record_rec
		status( ): string
		status_icon( ): Record<string, $mol_icon>
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	type __yuf_camera_recorder_button_1 = $mol_type_enforce<
		Parameters< $yuf_camera_recorder_button['error_packed'] >[0]
		,
		Parameters< ReturnType< $yuf_camera_recorder_button['recorder'] >['error_packed'] >[0]
	>
	type __yuf_camera_recorder_button_2 = $mol_type_enforce<
		Parameters< $yuf_camera_recorder_button['recording_status'] >[0]
		,
		Parameters< ReturnType< $yuf_camera_recorder_button['recorder'] >['status'] >[0]
	>
	type $yuf_camera_recorder_icon__status_yuf_camera_recorder_button_3 = $mol_type_enforce<
		ReturnType< $yuf_camera_recorder_button['recorder_status_next'] >
		,
		ReturnType< $yuf_camera_recorder_icon['status'] >
	>
	export class $yuf_camera_recorder_button extends $mol_button_minor {
		error_packed( next?: ReturnType< ReturnType< $yuf_camera_recorder_button['recorder'] >['error_packed'] > ): ReturnType< ReturnType< $yuf_camera_recorder_button['recorder'] >['error_packed'] >
		recording_status( next?: ReturnType< ReturnType< $yuf_camera_recorder_button['recorder'] >['status'] > ): ReturnType< ReturnType< $yuf_camera_recorder_button['recorder'] >['status'] >
		recorder_status_next( ): string
		Icon( ): $yuf_camera_recorder_icon
		recorder( ): $yuf_camera_recorder
		status_message( ): Record<string, string>
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $ {

	export class $mol_video_player extends $mol_view {
		uri( ): string
		controls( ): boolean
		autoplay( ): boolean
		inline( ): boolean
		loop( ): boolean
		muted( ): boolean
		poster( ): string
		stream( ): any
		revolume( next?: any ): any
		retime( next?: any ): any
		redurate( next?: any ): any
		playing_event( next?: any ): any
		play_event( next?: any ): any
		pause_event( next?: any ): any
		dom_name( ): string
		playing( next?: boolean ): boolean
		play( ): any
		pause( ): any
		volume( next?: number ): number
		time( next?: number ): number
		duration( ): number
		attr( ): ({ 
			'src': ReturnType< $mol_video_player['uri'] >,
			'controls': ReturnType< $mol_video_player['controls'] >,
			'autoplay': ReturnType< $mol_video_player['autoplay'] >,
			'playsinline': ReturnType< $mol_video_player['inline'] >,
			'loop': ReturnType< $mol_video_player['loop'] >,
			'muted': ReturnType< $mol_video_player['muted'] >,
			'poster': ReturnType< $mol_video_player['poster'] >,
		}) 
		field( ): ({ 
			'srcObject': ReturnType< $mol_video_player['stream'] >,
		}) 
		event( ): ({ 
			volumechange( next?: ReturnType< $mol_video_player['revolume'] > ): ReturnType< $mol_video_player['revolume'] >,
			timeupdate( next?: ReturnType< $mol_video_player['retime'] > ): ReturnType< $mol_video_player['retime'] >,
			durationchange( next?: ReturnType< $mol_video_player['redurate'] > ): ReturnType< $mol_video_player['redurate'] >,
			playing( next?: ReturnType< $mol_video_player['playing_event'] > ): ReturnType< $mol_video_player['playing_event'] >,
			play( next?: ReturnType< $mol_video_player['play_event'] > ): ReturnType< $mol_video_player['play_event'] >,
			pause( next?: ReturnType< $mol_video_player['pause_event'] > ): ReturnType< $mol_video_player['pause_event'] >,
		}) 
	}
	
}

//# sourceMappingURL=player.view.tree.d.ts.map
declare namespace $ {

	export class $mol_video_camera extends $mol_video_player {
		transform( ): string
		facing( ): string
		aspect( ): number
		size( ): number
		width( ): ReturnType< $mol_video_camera['size'] >
		height( ): ReturnType< $mol_video_camera['size'] >
		brightness( ): number
		sharpness( ): number
		contrast( ): number
		saturation( ): number
		temperature( ): number
		torch( ): boolean
		controls( ): boolean
		style( ): ({ 
			'transform': ReturnType< $mol_video_camera['transform'] >,
		}) 
		video_constraints( ): ({ 
			'facingMode': ReturnType< $mol_video_camera['facing'] >,
			'aspectRatio': ReturnType< $mol_video_camera['aspect'] >,
			'width': ({ 
				'ideal': ReturnType< $mol_video_camera['width'] >,
			}) ,
			'height': ({ 
				'ideal': ReturnType< $mol_video_camera['height'] >,
			}) ,
		}) 
		video_settings( ): ({ 
			'brightness': ReturnType< $mol_video_camera['brightness'] >,
			'sharpness': ReturnType< $mol_video_camera['sharpness'] >,
			'contrast': ReturnType< $mol_video_camera['contrast'] >,
			'saturation': ReturnType< $mol_video_camera['saturation'] >,
			'advanced': readonly(any)[],
		}) 
	}
	
}

//# sourceMappingURL=camera.view.tree.d.ts.map
declare namespace $ {

	type $yuf_camera_pane_video__facing_yuf_camera_pane_1 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['facing'] >
		,
		ReturnType< $yuf_camera_pane_video['facing'] >
	>
	type $yuf_camera_pane_video__width_yuf_camera_pane_2 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['desirable_width'] >
		,
		ReturnType< $yuf_camera_pane_video['width'] >
	>
	type $yuf_camera_pane_video__height_yuf_camera_pane_3 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['desirable_height'] >
		,
		ReturnType< $yuf_camera_pane_video['height'] >
	>
	type $yuf_camera_pane_video__click_yuf_camera_pane_4 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['camera_click'] >
		,
		ReturnType< $yuf_camera_pane_video['click'] >
	>
	type $mol_view__sub_yuf_camera_pane_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_camera_recorder_button__recorder_yuf_camera_pane_6 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['recorder'] >
		,
		ReturnType< $yuf_camera_recorder_button['recorder'] >
	>
	type $mol_button_minor__hint_yuf_camera_pane_7 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['close_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_yuf_camera_pane_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_yuf_camera_pane_9 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['close_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $yuf_camera_pane_controls__10 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['controls_main'] >[number]
		,
		$mol_view_content
	>
	type $yuf_camera_pane_controls__11 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['video_controls'] >[number]
		,
		$mol_view_content
	>
	type $yuf_camera_pane_controls__12 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['controls_close'] >[number]
		,
		$mol_view_content
	>
	type $mol_view__sub_yuf_camera_pane_13 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['controls'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_camera_recorder__stream_yuf_camera_pane_14 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['stream'] >
		,
		ReturnType< $yuf_camera_recorder['stream'] >
	>
	type $yuf_canvas_image__image_type_yuf_camera_pane_15 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['image_type'] >
		,
		ReturnType< $yuf_canvas_image['image_type'] >
	>
	type $yuf_canvas_image__node_yuf_camera_pane_16 = $mol_type_enforce<
		ReturnType< $yuf_camera_pane['camera_node'] >
		,
		ReturnType< $yuf_canvas_image['node'] >
	>
	export class $yuf_camera_pane extends $mol_view {
		recorder_status( ): ReturnType< ReturnType< $yuf_camera_pane['recorder'] >['status'] >
		recorder_error( ): ReturnType< ReturnType< $yuf_camera_pane['recorder'] >['error'] >
		image_type( ): string
		camera_node( ): ReturnType< ReturnType< $yuf_camera_pane['Camera'] >['dom_safe'] >
		stream( ): ReturnType< ReturnType< $yuf_camera_pane['Camera'] >['stream'] >
		facing( ): string
		desirable_width( ): number
		desirable_height( ): number
		camera_click( next?: any ): any
		Camera( ): $yuf_camera_pane_video
		status_text( ): string
		Status( ): $mol_view
		controls_main( ): readonly($mol_view_content)[]
		Video_status_button( ): $yuf_camera_recorder_button
		video_controls( ): readonly($mol_view_content)[]
		close_hint( ): string
		Close_icon( ): $mol_icon_close
		close_click( next?: any ): any
		Close( ): $mol_button_minor
		controls_close( ): readonly($mol_view_content)[]
		controls( ): readonly($mol_view_content)[]
		Controls( ): $mol_view
		video_enabled( next?: boolean ): boolean
		video_acceptable( ): boolean
		file_name_template( ): string
		recorder( ): $yuf_camera_recorder
		canvas( ): $yuf_canvas_image
		canvas_file( ): File | null
		files( next?: readonly(File)[] ): readonly(File)[]
		status( next?: readonly(any)[] ): readonly(any)[]
		saving_text( ): string
		sub( ): readonly(any)[]
	}
	
	export class $yuf_camera_pane_video extends $mol_video_camera {
		click( next?: any ): any
		dom_safe( ): ReturnType< $yuf_camera_pane_video['dom_node'] >
		event( ): ({ 
			click( next?: ReturnType< $yuf_camera_pane_video['click'] > ): ReturnType< $yuf_camera_pane_video['click'] >,
		})  & ReturnType< $mol_video_camera['event'] >
	}
	
}

//# sourceMappingURL=pane.view.tree.d.ts.map
declare namespace $ {

	type $yuf_camera_pane__files_yuf_camera_pick_1 = $mol_type_enforce<
		ReturnType< $yuf_camera_pick['cam_files'] >
		,
		ReturnType< $yuf_camera_pane['files'] >
	>
	type $yuf_camera_pane__close_click_yuf_camera_pick_2 = $mol_type_enforce<
		ReturnType< $yuf_camera_pick['close_click'] >
		,
		ReturnType< $yuf_camera_pane['close_click'] >
	>
	export class $yuf_camera_pick extends $mol_pick {
		Trigger_icon( ): $mol_icon_camera
		files( next?: readonly(File)[] ): readonly(File)[]
		cam_files( next?: ReturnType< $yuf_camera_pick['files'] > ): ReturnType< $yuf_camera_pick['files'] >
		close_click( next?: any ): any
		Camera( ): $yuf_camera_pane
		trigger_content( ): readonly(any)[]
		bubble_content( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=pick.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_camera_off extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=off.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_close_circle extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=circle.view.tree.d.ts.map
declare namespace $ {

	type $yuf_attach_item__click_yuf_attach_1 = $mol_type_enforce<
		ReturnType< $yuf_attach['item_drop'] >
		,
		ReturnType< $yuf_attach_item['click'] >
	>
	type $yuf_attach_item__file_yuf_attach_2 = $mol_type_enforce<
		ReturnType< $yuf_attach['file'] >
		,
		ReturnType< $yuf_attach_item['file'] >
	>
	type $yuf_attach_item__uploading_yuf_attach_3 = $mol_type_enforce<
		ReturnType< $yuf_attach['uploading'] >
		,
		ReturnType< $yuf_attach_item['uploading'] >
	>
	type $mol_view__sub_yuf_attach_4 = $mol_type_enforce<
		ReturnType< $yuf_attach['items_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_open__hint_yuf_attach_5 = $mol_type_enforce<
		ReturnType< $yuf_attach['attach_hint'] >
		,
		ReturnType< $mol_button_open['hint'] >
	>
	type $mol_button_open__files_yuf_attach_6 = $mol_type_enforce<
		ReturnType< $yuf_attach['attach_new'] >
		,
		ReturnType< $mol_button_open['files'] >
	>
	type $mol_button_open__multiple_yuf_attach_7 = $mol_type_enforce<
		ReturnType< $yuf_attach['multiple'] >
		,
		ReturnType< $mol_button_open['multiple'] >
	>
	type $mol_button_open__accept_yuf_attach_8 = $mol_type_enforce<
		ReturnType< $yuf_attach['accept'] >
		,
		ReturnType< $mol_button_open['accept'] >
	>
	type $mol_button_open__enabled_yuf_attach_9 = $mol_type_enforce<
		ReturnType< $yuf_attach['enabled'] >
		,
		ReturnType< $mol_button_open['enabled'] >
	>
	type $mol_button_open__Icon_yuf_attach_10 = $mol_type_enforce<
		ReturnType< $yuf_attach['Add_icon'] >
		,
		ReturnType< $mol_button_open['Icon'] >
	>
	type $yuf_camera_pick__files_yuf_attach_11 = $mol_type_enforce<
		ReturnType< $yuf_attach['attach_new'] >
		,
		ReturnType< $yuf_camera_pick['files'] >
	>
	type $yuf_camera_pick__align_yuf_attach_12 = $mol_type_enforce<
		ReturnType< $yuf_attach['camera_pick_align'] >
		,
		ReturnType< $yuf_camera_pick['align'] >
	>
	export class $yuf_attach extends $mol_view {
		item_drop( id: any, next?: any ): any
		file( id: any): File
		uploading( id: any): boolean
		Item( id: any): $yuf_attach_item
		items_content( ): readonly($mol_view)[]
		Content( ): $mol_view
		attach_hint( ): string
		attach_new( next?: any ): any
		multiple( ): boolean
		accept( ): string
		enabled( ): boolean
		Add_icon( ): $mol_icon_attachment
		Add( ): $mol_button_open
		camera_pick_align( ): string
		Camera_pick( ): $yuf_camera_pick
		camera_content_inner( ): readonly($mol_view_content)[]
		camera_content( ): ReturnType< $yuf_attach['camera_content_inner'] >
		files( next?: Record<string, File|null> ): Record<string, File|null>
		removing( id: any, next?: boolean ): boolean
		ids( ): readonly(string)[]
		serial_uploads( ): boolean
		sub( ): readonly(any)[]
	}
	
	type $mol_image__title_yuf_attach_item_1 = $mol_type_enforce<
		ReturnType< $yuf_attach_item['image_title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_yuf_attach_item_2 = $mol_type_enforce<
		ReturnType< $yuf_attach_item['item_uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $yuf_attach_unknown__Icon_yuf_attach_item_3 = $mol_type_enforce<
		ReturnType< $yuf_attach_item['Unknown_icon'] >
		,
		ReturnType< $yuf_attach_unknown['Icon'] >
	>
	type $yuf_attach_unknown__file_name_yuf_attach_item_4 = $mol_type_enforce<
		ReturnType< $yuf_attach_item['file_name'] >
		,
		ReturnType< $yuf_attach_unknown['file_name'] >
	>
	export class $yuf_attach_item extends $mol_button_minor {
		uploading_status( ): string
		image_title( ): string
		item_uri( ): string
		Image( ): $mol_image
		item_content( ): readonly($mol_view)[]
		Unknown_icon( ): $mol_icon_camera_off
		file_name( ): string
		Unknown( ): $yuf_attach_unknown
		unknown_content( ): readonly($mol_view)[]
		Remove_icon( ): $mol_icon_close_circle
		attr( ): ({ 
			'yuf_attach_item_status': ReturnType< $yuf_attach_item['uploading_status'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		file( ): File
		image_regexp( ): string
		is_image( ): boolean
		uploading( ): boolean
		sub( ): readonly(any)[]
	}
	
	type $mol_view__sub_yuf_attach_unknown_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $yuf_attach_unknown extends $mol_view {
		Icon( ): $mol_view
		file_name( ): string
		ext( ): ReturnType< $yuf_attach_unknown['file_name'] >
		Text( ): $mol_view
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=attach.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__event_yuf_blend_1 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $yuf_blend['click'] > ): ReturnType< $yuf_blend['click'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_view__sub_yuf_blend_2 = $mol_type_enforce<
		ReturnType< $yuf_blend['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $yuf_blend extends $mol_view {
		direction( ): string
		click( next?: any ): any
		Back( ): $mol_view
		content( ): readonly($mol_view_content)[]
		Content( ): $mol_view
		attr( ): ({ 
			'yuf_blend_direction': ReturnType< $yuf_blend['direction'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=blend.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_portal extends $yuf_blend {
		display( ): any
		bubbles( ): readonly($mol_view)[]
		showed( next?: boolean ): boolean
		style( ): ({ 
			'display': ReturnType< $yuf_portal['display'] >,
		})  & ReturnType< $yuf_blend['style'] >
		content( ): ReturnType< $yuf_portal['bubbles'] >
		popup_add( next?: $yuf_portal_popup ): $yuf_portal_popup
		popup_remove( next?: $yuf_portal_popup ): $yuf_portal_popup
		popups( next?: readonly($yuf_portal_popup)[] ): readonly($yuf_portal_popup)[]
	}
	
}

//# sourceMappingURL=portal.view.tree.d.ts.map
declare namespace $ {

	type __yuf_attach_demo_1 = $mol_type_enforce<
		Parameters< $yuf_attach_demo['item_drop'] >[0]
		,
		Parameters< ReturnType< $yuf_attach_demo['Filled'] >['item_drop'] >[0]
	>
	type __yuf_attach_demo_2 = $mol_type_enforce<
		Parameters< $yuf_attach_demo['file'] >[0]
		,
		Parameters< ReturnType< $yuf_attach_demo['Filled'] >['file'] >[0]
	>
	type $yuf_attach__multiple_yuf_attach_demo_3 = $mol_type_enforce<
		boolean
		,
		ReturnType< $yuf_attach['multiple'] >
	>
	type $yuf_attach__uploading_yuf_attach_demo_4 = $mol_type_enforce<
		ReturnType< $yuf_attach_demo['uploading'] >
		,
		ReturnType< $yuf_attach['uploading'] >
	>
	type $mol_view__sub_yuf_attach_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_yuf_attach_demo_6 = $mol_type_enforce<
		ReturnType< $yuf_attach_demo['uploads'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows_yuf_attach_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $yuf_attach_demo extends $mol_example_small {
		Portal( ): $yuf_portal
		item_drop( id: any): ReturnType< ReturnType< $yuf_attach_demo['Filled'] >['item_drop'] >
		file( id: any): ReturnType< ReturnType< $yuf_attach_demo['Filled'] >['file'] >
		uploading( id: any): boolean
		Filled( ): $yuf_attach
		upload_name( id: any): string
		Uploaded( id: any): $mol_view
		uploads( ): readonly(any)[]
		Uploads( ): $mol_list
		List( ): $mol_list
		title( ): string
		ids( next?: readonly(string)[] ): readonly(string)[]
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_search__query_mol_book2_catalog_1 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_filter'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_dimmer__needle_mol_book2_catalog_2 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_book2_catalog_3 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['spread_title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_link__arg_mol_book2_catalog_4 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_link_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_book2_catalog_5 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_link_content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_mol_book2_catalog_6 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_item_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__Empty_mol_book2_catalog_7 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['Menu_links_empty'] >
		,
		ReturnType< $mol_list['Empty'] >
	>
	type $mol_list__rows_mol_book2_catalog_8 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_links'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__title_mol_book2_catalog_9 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__Logo_mol_book2_catalog_10 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['Menu_logo'] >
		,
		ReturnType< $mol_page['Logo'] >
	>
	type $mol_page__tools_mol_book2_catalog_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__head_mol_book2_catalog_12 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_head'] >
		,
		ReturnType< $mol_page['head'] >
	>
	type $mol_page__body_mol_book2_catalog_13 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_body'] >
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot_mol_book2_catalog_14 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_foot'] >
		,
		ReturnType< $mol_page['foot'] >
	>
	type $mol_link__arg_mol_book2_catalog_15 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['spread_close_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__hint_mol_book2_catalog_16 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_book2_catalog_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_book2_catalog extends $mol_book2 {
		Menu_title( ): ReturnType< ReturnType< $mol_book2_catalog['Menu'] >['Title'] >
		menu_title( ): string
		Menu_tools( ): ReturnType< ReturnType< $mol_book2_catalog['Menu'] >['Tools'] >
		Menu_logo( ): any
		menu_head( ): readonly($mol_view_content)[]
		menu_filter( next?: string ): string
		Menu_filter( ): $mol_search
		Menu_links_empty( ): $mol_view
		arg( id: any): Record<string, any>
		menu_link_arg( id: any): ReturnType< $mol_book2_catalog['arg'] >
		spread_title( id: any): string
		Menu_link_title( id: any): $mol_dimmer
		menu_link_content( id: any): readonly($mol_view_content)[]
		Menu_link( id: any): $mol_link
		menu_item_content( id: any): readonly($mol_view)[]
		Menu_item( id: any): $mol_view
		menu_links( ): readonly($mol_view)[]
		Menu_links( ): $mol_list
		menu_body( ): readonly($mol_view)[]
		menu_foot( ): readonly($mol_view)[]
		Menu( ): $mol_page
		spread_close_arg( ): Record<string, any>
		Spread_close_icon( ): $mol_icon_close
		param( ): string
		spread( next?: string ): string
		spreads( ): Record<string, any>
		Spread( id: any): $mol_view
		Spread_default( ): any
		spread_ids( ): readonly(string)[]
		menu_filter_enabled( ): boolean
		spread_ids_filtered( ): readonly(string)[]
		spread_current( ): any
		menu_tools( ): readonly(any)[]
		addon_tools( ): readonly(any)[]
		pages( ): readonly(any)[]
		Spread_close( ): $mol_link
	}
	
}

//# sourceMappingURL=catalog.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_link extends $mol_link {
		link_arg( ): Record<string, any>
		Icon( ): any
		content( ): readonly($mol_view_content)[]
		param_name( ): string
		param_value( ): string
		default( ): boolean
		unselectable( ): boolean
		arg( ): ReturnType< $yuf_link['link_arg'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=link.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_link_close extends $yuf_link {
		param_value( ): any
		hint( ): string
		title( ): string
		Icon( ): $mol_icon_close
	}
	
}

//# sourceMappingURL=close.view.tree.d.ts.map
declare namespace $ {

	type $yuf_link_close__link_arg_yuf_catalog_1 = $mol_type_enforce<
		ReturnType< $yuf_catalog['spread_close_arg'] >
		,
		ReturnType< $yuf_link_close['link_arg'] >
	>
	type $yuf_link__arg_yuf_catalog_2 = $mol_type_enforce<
		ReturnType< $yuf_catalog['arg'] >
		,
		ReturnType< $yuf_link['arg'] >
	>
	type $yuf_link__unselectable_yuf_catalog_3 = $mol_type_enforce<
		boolean
		,
		ReturnType< $yuf_link['unselectable'] >
	>
	type $yuf_link__default_yuf_catalog_4 = $mol_type_enforce<
		ReturnType< $yuf_catalog['menu_link_default'] >
		,
		ReturnType< $yuf_link['default'] >
	>
	type $yuf_link__content_yuf_catalog_5 = $mol_type_enforce<
		ReturnType< $yuf_catalog['menu_link_content'] >
		,
		ReturnType< $yuf_link['content'] >
	>
	type $yuf_link__hint_yuf_catalog_6 = $mol_type_enforce<
		ReturnType< $yuf_catalog['menu_link_hint'] >
		,
		ReturnType< $yuf_link['hint'] >
	>
	export class $yuf_catalog extends $mol_book2_catalog {
		param_base( ): string
		Spread_close( ): $yuf_link_close
		menu_link_default( id: any): boolean
		menu_link_hint( id: any): any
		spread_default( ): string
		param_prefix( ): string
		param_suffix( ): string
		param( ): ReturnType< $yuf_catalog['param_base'] >
		spread_close_content( ): readonly($mol_view)[]
		Menu_link( id: any): $yuf_link
	}
	
}

//# sourceMappingURL=catalog.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_filter extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=filter.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_face extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=face.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_face_agent extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=agent.view.tree.d.ts.map
declare namespace $ {

	type $mol_filler_filler_lines__1 = $mol_type_enforce<
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `
		,
		string
	>
	type $mol_filler_filler_lines__2 = $mol_type_enforce<
		`Donec a diam lectus. `
		,
		string
	>
	type $mol_filler_filler_lines__3 = $mol_type_enforce<
		`Sed sit amet ipsum mauris. `
		,
		string
	>
	type $mol_filler_filler_lines__4 = $mol_type_enforce<
		`Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. `
		,
		string
	>
	type $mol_filler_filler_lines__5 = $mol_type_enforce<
		`Donec et mollis dolor. `
		,
		string
	>
	type $mol_filler_filler_lines__6 = $mol_type_enforce<
		`Praesent et diam eget libero egestas mattis sit amet vitae augue. `
		,
		string
	>
	type $mol_filler_filler_lines__7 = $mol_type_enforce<
		`Nam tincidunt congue enim, ut porta lorem lacinia consectetur. `
		,
		string
	>
	type $mol_filler_filler_lines__8 = $mol_type_enforce<
		`Donec ut libero sed arcu vehicula ultricies a non tortor. `
		,
		string
	>
	type $mol_filler_filler_lines__9 = $mol_type_enforce<
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `
		,
		string
	>
	type $mol_filler_filler_lines__10 = $mol_type_enforce<
		`Aenean ut gravida lorem. `
		,
		string
	>
	type $mol_filler_filler_lines__11 = $mol_type_enforce<
		`Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. `
		,
		string
	>
	type $mol_filler_filler_lines__12 = $mol_type_enforce<
		`Pellentesque auctor nisi id magna consequat sagittis. `
		,
		string
	>
	type $mol_filler_filler_lines__13 = $mol_type_enforce<
		`Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. `
		,
		string
	>
	type $mol_filler_filler_lines__14 = $mol_type_enforce<
		`Ut convallis libero in urna ultrices accumsan. `
		,
		string
	>
	type $mol_filler_filler_lines__15 = $mol_type_enforce<
		`Donec sed odio eros. `
		,
		string
	>
	type $mol_filler_filler_lines__16 = $mol_type_enforce<
		`Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. `
		,
		string
	>
	type $mol_filler_filler_lines__17 = $mol_type_enforce<
		`Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. `
		,
		string
	>
	type $mol_filler_filler_lines__18 = $mol_type_enforce<
		`In rutrum accumsan ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__19 = $mol_type_enforce<
		`Mauris vitae nisi at sem facilisis semper ac in est. `
		,
		string
	>
	type $mol_filler_filler_lines__20 = $mol_type_enforce<
		`Vivamus fermentum semper porta. `
		,
		string
	>
	type $mol_filler_filler_lines__21 = $mol_type_enforce<
		`Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. `
		,
		string
	>
	type $mol_filler_filler_lines__22 = $mol_type_enforce<
		`Maecenas convallis ullamcorper ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__23 = $mol_type_enforce<
		`Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. `
		,
		string
	>
	type $mol_filler_filler_lines__24 = $mol_type_enforce<
		`Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. `
		,
		string
	>
	type $mol_filler_filler_lines__25 = $mol_type_enforce<
		`Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. `
		,
		string
	>
	type $mol_filler_filler_lines__26 = $mol_type_enforce<
		`Fusce eget orci a orci congue vestibulum. `
		,
		string
	>
	type $mol_filler_filler_lines__27 = $mol_type_enforce<
		`Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. `
		,
		string
	>
	type $mol_filler_filler_lines__28 = $mol_type_enforce<
		`Curabitur venenatis pulvinar tellus gravida ornare. `
		,
		string
	>
	type $mol_filler_filler_lines__29 = $mol_type_enforce<
		`Sed et erat faucibus nunc euismod ultricies ut id justo. `
		,
		string
	>
	type $mol_filler_filler_lines__30 = $mol_type_enforce<
		`Nullam cursus suscipit nisi, et ultrices justo sodales nec. `
		,
		string
	>
	type $mol_filler_filler_lines__31 = $mol_type_enforce<
		`Fusce venenatis facilisis lectus ac semper. `
		,
		string
	>
	type $mol_filler_filler_lines__32 = $mol_type_enforce<
		`Aliquam at massa ipsum. `
		,
		string
	>
	type $mol_filler_filler_lines__33 = $mol_type_enforce<
		`Quisque bibendum purus convallis nulla ultrices ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__34 = $mol_type_enforce<
		`Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. `
		,
		string
	>
	type $mol_filler_filler_lines__35 = $mol_type_enforce<
		`Fusce vel volutpat elit. `
		,
		string
	>
	type $mol_filler_filler_lines__36 = $mol_type_enforce<
		`Nam sagittis nisi dui. `
		,
		string
	>
	type $mol_filler_filler_lines__37 = $mol_type_enforce<
		`Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. `
		,
		string
	>
	type $mol_filler_filler_lines__38 = $mol_type_enforce<
		`Etiam luctus porttitor lorem, sed suscipit est rutrum non. `
		,
		string
	>
	type $mol_filler_filler_lines__39 = $mol_type_enforce<
		`Curabitur lobortis nisl a enim congue semper. `
		,
		string
	>
	type $mol_filler_filler_lines__40 = $mol_type_enforce<
		`Aenean commodo ultrices imperdiet. `
		,
		string
	>
	type $mol_filler_filler_lines__41 = $mol_type_enforce<
		`Vestibulum ut justo vel sapien venenatis tincidunt. `
		,
		string
	>
	type $mol_filler_filler_lines__42 = $mol_type_enforce<
		`Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. `
		,
		string
	>
	type $mol_filler_filler_lines__43 = $mol_type_enforce<
		`Aliquam ut massa in turpis dapibus convallis. `
		,
		string
	>
	type $mol_filler_filler_lines__44 = $mol_type_enforce<
		`Praesent elit lacus, vestibulum at malesuada et, ornare et est. `
		,
		string
	>
	type $mol_filler_filler_lines__45 = $mol_type_enforce<
		`Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. `
		,
		string
	>
	type $mol_filler_filler_lines__46 = $mol_type_enforce<
		`Mauris ut placerat justo. `
		,
		string
	>
	type $mol_filler_filler_lines__47 = $mol_type_enforce<
		`Mauris in ultricies enim. `
		,
		string
	>
	type $mol_filler_filler_lines__48 = $mol_type_enforce<
		`Quisque nec est eleifend nulla ultrices egestas quis ut quam. `
		,
		string
	>
	type $mol_filler_filler_lines__49 = $mol_type_enforce<
		`Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. `
		,
		string
	>
	type $mol_filler_filler_lines__50 = $mol_type_enforce<
		`Cras quis ligula sem, vel elementum mi. `
		,
		string
	>
	type $mol_filler_filler_lines__51 = $mol_type_enforce<
		`Phasellus non ullamcorper urna. `
		,
		string
	>
	type $mol_filler_filler_lines__52 = $mol_type_enforce<
		`Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. `
		,
		string
	>
	type $mol_filler_filler_lines__53 = $mol_type_enforce<
		`In euismod ultrices facilisis. `
		,
		string
	>
	type $mol_filler_filler_lines__54 = $mol_type_enforce<
		`Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. `
		,
		string
	>
	type $mol_filler_filler_lines__55 = $mol_type_enforce<
		`Proin quis dictum nisl. `
		,
		string
	>
	type $mol_filler_filler_lines__56 = $mol_type_enforce<
		`Morbi id quam sapien, sed vestibulum sem. `
		,
		string
	>
	type $mol_filler_filler_lines__57 = $mol_type_enforce<
		`Duis elementum rutrum mauris sed convallis. `
		,
		string
	>
	type $mol_filler_filler_lines__58 = $mol_type_enforce<
		`Proin vestibulum magna mi. `
		,
		string
	>
	type $mol_filler_filler_lines__59 = $mol_type_enforce<
		`Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. `
		,
		string
	>
	type $mol_filler_filler_lines__60 = $mol_type_enforce<
		`Sed non tortor sodales quam auctor elementum. `
		,
		string
	>
	type $mol_filler_filler_lines__61 = $mol_type_enforce<
		`Donec hendrerit nunc eget elit pharetra pulvinar. `
		,
		string
	>
	type $mol_filler_filler_lines__62 = $mol_type_enforce<
		`Suspendisse id tempus tortor. `
		,
		string
	>
	type $mol_filler_filler_lines__63 = $mol_type_enforce<
		`Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. `
		,
		string
	>
	type $mol_filler_filler_lines__64 = $mol_type_enforce<
		`Donec vel. `
		,
		string
	>
	type $mol_filler_filler_lines__65 = $mol_type_enforce<
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `
		,
		string
	>
	type $mol_filler_filler_lines__66 = $mol_type_enforce<
		`Donec a diam lectus. `
		,
		string
	>
	type $mol_filler_filler_lines__67 = $mol_type_enforce<
		`Sed sit amet ipsum mauris. `
		,
		string
	>
	type $mol_filler_filler_lines__68 = $mol_type_enforce<
		`Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. `
		,
		string
	>
	type $mol_filler_filler_lines__69 = $mol_type_enforce<
		`Donec et mollis dolor. `
		,
		string
	>
	type $mol_filler_filler_lines__70 = $mol_type_enforce<
		`Praesent et diam eget libero egestas mattis sit amet vitae augue. `
		,
		string
	>
	type $mol_filler_filler_lines__71 = $mol_type_enforce<
		`Nam tincidunt congue enim, ut porta lorem lacinia consectetur. `
		,
		string
	>
	type $mol_filler_filler_lines__72 = $mol_type_enforce<
		`Donec ut libero sed arcu vehicula ultricies a non tortor. `
		,
		string
	>
	type $mol_filler_filler_lines__73 = $mol_type_enforce<
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `
		,
		string
	>
	type $mol_filler_filler_lines__74 = $mol_type_enforce<
		`Aenean ut gravida lorem. `
		,
		string
	>
	type $mol_filler_filler_lines__75 = $mol_type_enforce<
		`Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. `
		,
		string
	>
	type $mol_filler_filler_lines__76 = $mol_type_enforce<
		`Pellentesque auctor nisi id magna consequat sagittis. `
		,
		string
	>
	type $mol_filler_filler_lines__77 = $mol_type_enforce<
		`Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. `
		,
		string
	>
	type $mol_filler_filler_lines__78 = $mol_type_enforce<
		`Ut convallis libero in urna ultrices accumsan. `
		,
		string
	>
	type $mol_filler_filler_lines__79 = $mol_type_enforce<
		`Donec sed odio eros. `
		,
		string
	>
	type $mol_filler_filler_lines__80 = $mol_type_enforce<
		`Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. `
		,
		string
	>
	type $mol_filler_filler_lines__81 = $mol_type_enforce<
		`Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. `
		,
		string
	>
	type $mol_filler_filler_lines__82 = $mol_type_enforce<
		`In rutrum accumsan ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__83 = $mol_type_enforce<
		`Mauris vitae nisi at sem facilisis semper ac in est. `
		,
		string
	>
	type $mol_filler_filler_lines__84 = $mol_type_enforce<
		`Vivamus fermentum semper porta. `
		,
		string
	>
	type $mol_filler_filler_lines__85 = $mol_type_enforce<
		`Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. `
		,
		string
	>
	type $mol_filler_filler_lines__86 = $mol_type_enforce<
		`Maecenas convallis ullamcorper ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__87 = $mol_type_enforce<
		`Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. `
		,
		string
	>
	type $mol_filler_filler_lines__88 = $mol_type_enforce<
		`Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. `
		,
		string
	>
	type $mol_filler_filler_lines__89 = $mol_type_enforce<
		`Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. `
		,
		string
	>
	type $mol_filler_filler_lines__90 = $mol_type_enforce<
		`Fusce eget orci a orci congue vestibulum. `
		,
		string
	>
	type $mol_filler_filler_lines__91 = $mol_type_enforce<
		`Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. `
		,
		string
	>
	type $mol_filler_filler_lines__92 = $mol_type_enforce<
		`Curabitur venenatis pulvinar tellus gravida ornare. `
		,
		string
	>
	type $mol_filler_filler_lines__93 = $mol_type_enforce<
		`Sed et erat faucibus nunc euismod ultricies ut id justo. `
		,
		string
	>
	type $mol_filler_filler_lines__94 = $mol_type_enforce<
		`Nullam cursus suscipit nisi, et ultrices justo sodales nec. `
		,
		string
	>
	type $mol_filler_filler_lines__95 = $mol_type_enforce<
		`Fusce venenatis facilisis lectus ac semper. `
		,
		string
	>
	type $mol_filler_filler_lines__96 = $mol_type_enforce<
		`Aliquam at massa ipsum. `
		,
		string
	>
	type $mol_filler_filler_lines__97 = $mol_type_enforce<
		`Quisque bibendum purus convallis nulla ultrices ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__98 = $mol_type_enforce<
		`Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. `
		,
		string
	>
	type $mol_filler_filler_lines__99 = $mol_type_enforce<
		`Fusce vel volutpat elit. `
		,
		string
	>
	type $mol_filler_filler_lines__100 = $mol_type_enforce<
		`Nam sagittis nisi dui. `
		,
		string
	>
	type $mol_filler_filler_lines__101 = $mol_type_enforce<
		`Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. `
		,
		string
	>
	type $mol_filler_filler_lines__102 = $mol_type_enforce<
		`Etiam luctus porttitor lorem, sed suscipit est rutrum non. `
		,
		string
	>
	type $mol_filler_filler_lines__103 = $mol_type_enforce<
		`Curabitur lobortis nisl a enim congue semper. `
		,
		string
	>
	type $mol_filler_filler_lines__104 = $mol_type_enforce<
		`Aenean commodo ultrices imperdiet. `
		,
		string
	>
	type $mol_filler_filler_lines__105 = $mol_type_enforce<
		`Vestibulum ut justo vel sapien venenatis tincidunt. `
		,
		string
	>
	type $mol_filler_filler_lines__106 = $mol_type_enforce<
		`Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. `
		,
		string
	>
	type $mol_filler_filler_lines__107 = $mol_type_enforce<
		`Aliquam ut massa in turpis dapibus convallis. `
		,
		string
	>
	type $mol_filler_filler_lines__108 = $mol_type_enforce<
		`Praesent elit lacus, vestibulum at malesuada et, ornare et est. `
		,
		string
	>
	type $mol_filler_filler_lines__109 = $mol_type_enforce<
		`Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. `
		,
		string
	>
	type $mol_filler_filler_lines__110 = $mol_type_enforce<
		`Mauris ut placerat justo. `
		,
		string
	>
	type $mol_filler_filler_lines__111 = $mol_type_enforce<
		`Mauris in ultricies enim. `
		,
		string
	>
	type $mol_filler_filler_lines__112 = $mol_type_enforce<
		`Quisque nec est eleifend nulla ultrices egestas quis ut quam. `
		,
		string
	>
	type $mol_filler_filler_lines__113 = $mol_type_enforce<
		`Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. `
		,
		string
	>
	type $mol_filler_filler_lines__114 = $mol_type_enforce<
		`Cras quis ligula sem, vel elementum mi. `
		,
		string
	>
	type $mol_filler_filler_lines__115 = $mol_type_enforce<
		`Phasellus non ullamcorper urna. `
		,
		string
	>
	type $mol_filler_filler_lines__116 = $mol_type_enforce<
		`Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. `
		,
		string
	>
	type $mol_filler_filler_lines__117 = $mol_type_enforce<
		`In euismod ultrices facilisis. `
		,
		string
	>
	type $mol_filler_filler_lines__118 = $mol_type_enforce<
		`Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. `
		,
		string
	>
	type $mol_filler_filler_lines__119 = $mol_type_enforce<
		`Proin quis dictum nisl. `
		,
		string
	>
	type $mol_filler_filler_lines__120 = $mol_type_enforce<
		`Morbi id quam sapien, sed vestibulum sem. `
		,
		string
	>
	type $mol_filler_filler_lines__121 = $mol_type_enforce<
		`Duis elementum rutrum mauris sed convallis. `
		,
		string
	>
	type $mol_filler_filler_lines__122 = $mol_type_enforce<
		`Proin vestibulum magna mi. `
		,
		string
	>
	type $mol_filler_filler_lines__123 = $mol_type_enforce<
		`Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. `
		,
		string
	>
	type $mol_filler_filler_lines__124 = $mol_type_enforce<
		`Sed non tortor sodales quam auctor elementum. `
		,
		string
	>
	type $mol_filler_filler_lines__125 = $mol_type_enforce<
		`Donec hendrerit nunc eget elit pharetra pulvinar. `
		,
		string
	>
	type $mol_filler_filler_lines__126 = $mol_type_enforce<
		`Suspendisse id tempus tortor. `
		,
		string
	>
	type $mol_filler_filler_lines__127 = $mol_type_enforce<
		`Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. `
		,
		string
	>
	type $mol_filler_filler_lines__128 = $mol_type_enforce<
		`Donec vel. `
		,
		string
	>
	export class $mol_filler extends $mol_paragraph {
		filler_lines( ): readonly(string)[]
		min_symbols( ): number
		sub( ): ReturnType< $mol_filler['filler_lines'] >
	}
	
}

//# sourceMappingURL=filler.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_left extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=left.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_right extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=right.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_mol_number_1 = $mol_type_enforce<
		({ 
			down( next?: ReturnType< $mol_number['event_dec'] > ): ReturnType< $mol_number['event_dec'] >,
			up( next?: ReturnType< $mol_number['event_inc'] > ): ReturnType< $mol_number['event_inc'] >,
			pageDown( next?: ReturnType< $mol_number['event_dec_boost'] > ): ReturnType< $mol_number['event_dec_boost'] >,
			pageUp( next?: ReturnType< $mol_number['event_inc_boost'] > ): ReturnType< $mol_number['event_inc_boost'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_button_minor__event_click_mol_number_2 = $mol_type_enforce<
		ReturnType< $mol_number['event_dec'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__enabled_mol_number_3 = $mol_type_enforce<
		ReturnType< $mol_number['dec_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_number_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_string__type_mol_number_5 = $mol_type_enforce<
		ReturnType< $mol_number['type'] >
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_string__keyboard_mol_number_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__value_mol_number_7 = $mol_type_enforce<
		ReturnType< $mol_number['value_string'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_number_8 = $mol_type_enforce<
		ReturnType< $mol_number['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__enabled_mol_number_9 = $mol_type_enforce<
		ReturnType< $mol_number['string_enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__submit_mol_number_10 = $mol_type_enforce<
		ReturnType< $mol_number['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_button_minor__event_click_mol_number_11 = $mol_type_enforce<
		ReturnType< $mol_number['event_inc'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__enabled_mol_number_12 = $mol_type_enforce<
		ReturnType< $mol_number['inc_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_number_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_number extends $mol_view {
		precision( ): number
		event_dec( next?: any ): any
		event_inc( next?: any ): any
		event_dec_boost( next?: any ): any
		event_inc_boost( next?: any ): any
		Hotkey( ): $mol_hotkey
		dec_enabled( ): ReturnType< $mol_number['enabled'] >
		dec_icon( ): $mol_icon_chevron_left
		Dec( ): $mol_button_minor
		type( ): string
		value_string( next?: string ): string
		hint( ): string
		string_enabled( ): ReturnType< $mol_number['enabled'] >
		submit( next?: any ): any
		String( ): $mol_string
		inc_enabled( ): ReturnType< $mol_number['enabled'] >
		inc_icon( ): $mol_icon_chevron_right
		Inc( ): $mol_button_minor
		precision_view( ): ReturnType< $mol_number['precision'] >
		precision_change( ): ReturnType< $mol_number['precision'] >
		boost( ): number
		value_min( ): number
		value_max( ): number
		value( next?: number ): number
		enabled( ): boolean
		plugins( ): readonly(any)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=number.view.tree.d.ts.map
declare namespace $ {

	type $yuf_catalog_demo_catalog__param_prefix_yuf_catalog_demo_1 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo['param'] >
		,
		ReturnType< $yuf_catalog_demo_catalog['param_prefix'] >
	>
	export class $yuf_catalog_demo extends $mol_example_large {
		Calatog( ): $yuf_catalog_demo_catalog
		title( ): string
		param( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
	type $yuf_catalog_demo_user_catalog__param_prefix_yuf_catalog_demo_catalog_1 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_catalog['param'] >
		,
		ReturnType< $yuf_catalog_demo_user_catalog['param_prefix'] >
	>
	type $yuf_catalog_demo_user_catalog__addon_tools_yuf_catalog_demo_catalog_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_catalog_demo_user_catalog['addon_tools'] >
	>
	type $yuf_catalog_demo_foods__param_prefix_yuf_catalog_demo_catalog_3 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_catalog['param'] >
		,
		ReturnType< $yuf_catalog_demo_foods['param_prefix'] >
	>
	type $yuf_catalog_demo_foods__addon_tools_yuf_catalog_demo_catalog_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_catalog_demo_foods['addon_tools'] >
	>
	export class $yuf_catalog_demo_catalog extends $yuf_catalog {
		Users( ): $yuf_catalog_demo_user_catalog
		Foods( ): $yuf_catalog_demo_foods
		param_suffix( ): string
		menu_title( ): string
		spreads( ): ({ 
			'users': ReturnType< $yuf_catalog_demo_catalog['Users'] >,
			'foods': ReturnType< $yuf_catalog_demo_catalog['Foods'] >,
		}) 
	}
	
	type $mol_page__title_yuf_catalog_demo_foods_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_yuf_catalog_demo_foods_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_yuf_catalog_demo_foods_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_yuf_catalog_demo_foods_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_yuf_catalog_demo_foods_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_yuf_catalog_demo_foods_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_yuf_catalog_demo_foods_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_yuf_catalog_demo_foods_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_yuf_catalog_demo_foods_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	export class $yuf_catalog_demo_foods extends $yuf_catalog {
		Pizza( ): $mol_page
		Hot_dogs( ): $mol_page
		Fries( ): $mol_page
		param_suffix( ): string
		menu_title( ): string
		spread_default( ): string
		Empty( ): $mol_status
		spreads( ): ({ 
			'pizza': ReturnType< $yuf_catalog_demo_foods['Pizza'] >,
			'hot_dogs': ReturnType< $yuf_catalog_demo_foods['Hot_dogs'] >,
			'fries': ReturnType< $yuf_catalog_demo_foods['Fries'] >,
		}) 
	}
	
	type __yuf_catalog_demo_user_catalog_1 = $mol_type_enforce<
		Parameters< $yuf_catalog_demo_user_catalog['by_id'] >[0]
		,
		Parameters< ReturnType< $yuf_catalog_demo_user_catalog['store'] >['by_id'] >[0]
	>
	type $yuf_link__sub_yuf_catalog_demo_user_catalog_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_link['sub'] >
	>
	type $yuf_link__param_name_yuf_catalog_demo_user_catalog_3 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['filter_param_name'] >
		,
		ReturnType< $yuf_link['param_name'] >
	>
	type $yuf_link__sub_yuf_catalog_demo_user_catalog_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_link['sub'] >
	>
	type $yuf_link__param_name_yuf_catalog_demo_user_catalog_5 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['age_param_name'] >
		,
		ReturnType< $yuf_link['param_name'] >
	>
	type $yuf_catalog_demo_user_filter__close_param_name_yuf_catalog_demo_user_catalog_6 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['filter_param_name'] >
		,
		ReturnType< $yuf_catalog_demo_user_filter['close_param_name'] >
	>
	type $yuf_catalog_demo_user_filter__age_from_yuf_catalog_demo_user_catalog_7 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['age_from'] >
		,
		ReturnType< $yuf_catalog_demo_user_filter['age_from'] >
	>
	type $yuf_catalog_demo_user_filter__title_yuf_catalog_demo_user_catalog_8 = $mol_type_enforce<
		string
		,
		ReturnType< $yuf_catalog_demo_user_filter['title'] >
	>
	type $yuf_catalog_demo_user_store__age_from_yuf_catalog_demo_user_catalog_9 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['age_from'] >
		,
		ReturnType< $yuf_catalog_demo_user_store['age_from'] >
	>
	type $yuf_catalog_demo_user_store__friend_user_id_yuf_catalog_demo_user_catalog_10 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['friend_user_id'] >
		,
		ReturnType< $yuf_catalog_demo_user_store['friend_user_id'] >
	>
	type $yuf_catalog_demo_user_link__arg_yuf_catalog_demo_user_catalog_11 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['arg'] >
		,
		ReturnType< $yuf_catalog_demo_user_link['arg'] >
	>
	type $yuf_catalog_demo_user_link__age_enabled_yuf_catalog_demo_user_catalog_12 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['age_enabled'] >
		,
		ReturnType< $yuf_catalog_demo_user_link['age_enabled'] >
	>
	type $yuf_catalog_demo_user_link__model_yuf_catalog_demo_user_catalog_13 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['by_id'] >
		,
		ReturnType< $yuf_catalog_demo_user_link['model'] >
	>
	type $yuf_catalog_demo_user_link__default_yuf_catalog_demo_user_catalog_14 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['menu_link_default'] >
		,
		ReturnType< $yuf_catalog_demo_user_link['default'] >
	>
	type $yuf_catalog_demo_user_info__model_yuf_catalog_demo_user_catalog_15 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['by_id'] >
		,
		ReturnType< $yuf_catalog_demo_user_info['model'] >
	>
	type $yuf_catalog_demo_user_info__param_base_yuf_catalog_demo_user_catalog_16 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_catalog['param'] >
		,
		ReturnType< $yuf_catalog_demo_user_info['param_base'] >
	>
	type $yuf_catalog_demo_user_info__addon_tools_yuf_catalog_demo_user_catalog_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_catalog_demo_user_info['addon_tools'] >
	>
	export class $yuf_catalog_demo_user_catalog extends $yuf_catalog {
		by_id( id: any): ReturnType< ReturnType< $yuf_catalog_demo_user_catalog['store'] >['by_id'] >
		spread_ids( ): ReturnType< ReturnType< $yuf_catalog_demo_user_catalog['store'] >['ids'] >
		age_from( next?: number ): number
		friend_user_id( ): string
		Filter_enable_icon( ): $mol_icon_filter
		filter_param_name( ): string
		Filter_enable( ): $yuf_link
		Age_enable_icon( ): $mol_icon_face_agent
		age_param_name( ): string
		Age_enable( ): $yuf_link
		Filter_page( ): $yuf_catalog_demo_user_filter
		age_enabled( ): boolean
		param_suffix( ): string
		param( ): string
		menu_title( ): string
		Content( ): $mol_filler
		Empty( ): $mol_status
		store( ): $yuf_catalog_demo_user_store
		menu_filter_enabled( ): boolean
		menu_tools( ): readonly(any)[]
		filter_content( ): readonly(any)[]
		Menu_link( id: any): $yuf_catalog_demo_user_link
		Spread( id: any): $yuf_catalog_demo_user_info
	}
	
	type $yuf_link__sub_yuf_catalog_demo_user_info_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_link['sub'] >
	>
	type $yuf_link__param_name_yuf_catalog_demo_user_info_2 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_info['age_param_name'] >
		,
		ReturnType< $yuf_link['param_name'] >
	>
	type $mol_labeler__title_yuf_catalog_demo_user_info_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_yuf_catalog_demo_user_info_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title_yuf_catalog_demo_user_info_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_yuf_catalog_demo_user_info_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $yuf_link__sub_yuf_catalog_demo_user_info_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_link['sub'] >
	>
	type $yuf_link__param_name_yuf_catalog_demo_user_info_8 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_info['friends_param_name'] >
		,
		ReturnType< $yuf_link['param_name'] >
	>
	type $mol_page__title_yuf_catalog_demo_user_info_9 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_info['menu_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_yuf_catalog_demo_user_info_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_yuf_catalog_demo_user_info_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $yuf_link_close__param_name_yuf_catalog_demo_user_info_12 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_info['friends_param_name'] >
		,
		ReturnType< $yuf_link_close['param_name'] >
	>
	type $yuf_catalog_demo_user_catalog__param_prefix_yuf_catalog_demo_user_info_13 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_info['param_base'] >
		,
		ReturnType< $yuf_catalog_demo_user_catalog['param_prefix'] >
	>
	type $yuf_catalog_demo_user_catalog__friend_user_id_yuf_catalog_demo_user_info_14 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_info['id'] >
		,
		ReturnType< $yuf_catalog_demo_user_catalog['friend_user_id'] >
	>
	type $yuf_catalog_demo_user_catalog__menu_title_yuf_catalog_demo_user_info_15 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_info['friends_title'] >
		,
		ReturnType< $yuf_catalog_demo_user_catalog['menu_title'] >
	>
	type $yuf_catalog_demo_user_catalog__addon_tools_yuf_catalog_demo_user_info_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_catalog_demo_user_catalog['addon_tools'] >
	>
	export class $yuf_catalog_demo_user_info extends $mol_book2 {
		name( ): ReturnType< ReturnType< $yuf_catalog_demo_user_info['model'] >['name'] >
		age( ): ReturnType< ReturnType< $yuf_catalog_demo_user_info['model'] >['age'] >
		id( ): ReturnType< ReturnType< $yuf_catalog_demo_user_info['model'] >['id'] >
		menu_title( ): string
		Age_enable_icon( ): $mol_icon_face_agent
		age_param_name( ): string
		Age_enable( ): $yuf_link
		addon_tools( ): readonly(any)[]
		Name( ): $mol_labeler
		Age( ): $mol_labeler
		age_content( ): readonly(any)[]
		friends_name( ): string
		Friends_enable( ): $yuf_link
		Info( ): $mol_page
		friends_param_name( ): ReturnType< ReturnType< $yuf_catalog_demo_user_info['Friends'] >['param_base'] >
		friends_title( ): string
		Friends_close( ): $yuf_link_close
		Friends( ): $yuf_catalog_demo_user_catalog
		friends_content( ): readonly(any)[]
		param_base( ): string
		model( ): $yuf_catalog_demo_user_model
		pages( ): readonly(any)[]
	}
	
	type $yuf_link_close__param_name_yuf_catalog_demo_user_filter_1 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_filter['close_param_name'] >
		,
		ReturnType< $yuf_link_close['param_name'] >
	>
	type $mol_number__value_yuf_catalog_demo_user_filter_2 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_filter['age_from'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name_yuf_catalog_demo_user_filter_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_catalog_demo_user_filter_4 = $mol_type_enforce<
		ReturnType< $yuf_catalog_demo_user_filter['Age'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_form__body_yuf_catalog_demo_user_filter_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['body'] >
	>
	type $mol_form__buttons_yuf_catalog_demo_user_filter_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['buttons'] >
	>
	export class $yuf_catalog_demo_user_filter extends $mol_page {
		close_param_name( ): string
		Filter_close( ): $yuf_link_close
		age_from( next?: number ): number
		Age( ): $mol_number
		Age_field( ): $mol_form_field
		Form( ): $mol_form
		theme( ): string
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
	}
	
	type $mol_labeler__title_yuf_catalog_demo_user_link_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_yuf_catalog_demo_user_link_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_labeler__title_yuf_catalog_demo_user_link_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_yuf_catalog_demo_user_link_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	export class $yuf_catalog_demo_user_link extends $yuf_link {
		name( ): ReturnType< ReturnType< $yuf_catalog_demo_user_link['model'] >['name'] >
		age( ): ReturnType< ReturnType< $yuf_catalog_demo_user_link['model'] >['age'] >
		Name( ): $mol_labeler
		Age( ): $mol_labeler
		age_content( ): readonly(any)[]
		model( ): $yuf_catalog_demo_user_model
		age_enabled( ): boolean
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_eye_off extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=off.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_check_icon2 extends $mol_check_icon {
		icon_disabled( ): boolean
		hint_checked( ): string
		hint_unchecked( ): string
		Icon_checked( ): $mol_icon_eye
		Icon_unchecked( ): $mol_icon_eye_off
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	type $yuf_password_check__checked_yuf_password_1 = $mol_type_enforce<
		ReturnType< $yuf_password['checked'] >
		,
		ReturnType< $yuf_password_check['checked'] >
	>
	export class $yuf_password extends $mol_password {
		Show( ): $yuf_password_check
	}
	
	export class $yuf_password_check extends $yuf_check_icon2 {
		tab_index( ): number
		attr( ): ({ 
			'tabIndex': ReturnType< $yuf_password_check['tab_index'] >,
		})  & ReturnType< $yuf_check_icon2['attr'] >
		Icon_checked( ): $mol_icon_eye
		Icon_unchecked( ): $mol_icon_eye_off
	}
	
}

//# sourceMappingURL=password.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_form_bid extends $mol_view {
		required_msg( ): string
		pattern_not_match_msg( ): string
		min_msg( ): string
		max_msg( ): string
		rows_max_msg( ): string
		json_invalid_msg( ): string
		ip4_msg( ): string
		ip4_mask_msg( ): string
		latin_digits_msg( ): string
		value_in_range_msg( ): string
		value( id: any): any
		value_empty( id: any): boolean
		value_date( id: any): $mol_time_moment|string
		params_min_date( ): Record<string, $mol_time_moment|string>
		params_max_date( ): Record<string, $mol_time_moment|string>
		params_min( ): Record<string, number>
		params_max( ): Record<string, number>
		params_max_rows( ): Record<string, number>
		params_limits( ): Record<string, readonly(readonly(number)[])[]>
		params_pattern( ): Record<string, string>
		pattern_val( id: any): string
		rows_max_val( id: any): number | null
		min_val( id: any): number | null
		max_val( id: any): number | null
		min_date_val( id: any): $mol_time_moment|null
		max_date_val( id: any): $mol_time_moment|null
		required( id: any): ReturnType< $yuf_form_bid['required_msg'] >
		pattern( id: any): ReturnType< $yuf_form_bid['pattern_not_match_msg'] >
		str_min_msg( ): string
		str_max_msg( ): string
		date_min_msg( ): string
		date_max_msg( ): string
		min( id: any): ReturnType< $yuf_form_bid['min_msg'] >
		max( id: any): ReturnType< $yuf_form_bid['max_msg'] >
		rows_max( id: any): ReturnType< $yuf_form_bid['rows_max_msg'] >
		json_invalid( id: any): ReturnType< $yuf_form_bid['json_invalid_msg'] >
		ip4( id: any): ReturnType< $yuf_form_bid['ip4_msg'] >
		ip4_mask( id: any): ReturnType< $yuf_form_bid['ip4_msg'] >
		ip4_mask_required( id: any): ReturnType< $yuf_form_bid['ip4_mask_msg'] >
		latin_digits( id: any): ReturnType< $yuf_form_bid['latin_digits_msg'] >
		latin_digits_alpha( id: any): ReturnType< $yuf_form_bid['latin_digits_msg'] >
		value_in_range( id: any, next?: ReturnType< $yuf_form_bid['value_in_range_msg'] > ): ReturnType< $yuf_form_bid['value_in_range_msg'] >
		value_limits( id: any): readonly(readonly(number)[])[]
	}
	
}

//# sourceMappingURL=bid.view.tree.d.ts.map
declare namespace $ {

	type __yuf_login_form_1 = $mol_type_enforce<
		Parameters< $yuf_login_form['required'] >[0]
		,
		Parameters< ReturnType< $yuf_login_form['Bid'] >['required'] >[0]
	>
	type __yuf_login_form_2 = $mol_type_enforce<
		Parameters< $yuf_login_form['min'] >[0]
		,
		Parameters< ReturnType< $yuf_login_form['Bid'] >['min'] >[0]
	>
	type __yuf_login_form_3 = $mol_type_enforce<
		Parameters< $yuf_login_form['max'] >[0]
		,
		Parameters< ReturnType< $yuf_login_form['Bid'] >['max'] >[0]
	>
	type $mol_string__value_yuf_login_form_4 = $mol_type_enforce<
		ReturnType< $yuf_login_form['login'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__submit_yuf_login_form_5 = $mol_type_enforce<
		ReturnType< $yuf_login_form['submit_activate_fork'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_form_field__bids_yuf_login_form_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_field['bids'] >
	>
	type $mol_form_field__name_yuf_login_form_7 = $mol_type_enforce<
		ReturnType< $yuf_login_form['login_label'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_login_form_8 = $mol_type_enforce<
		ReturnType< $yuf_login_form['Login'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $yuf_password__value_yuf_login_form_9 = $mol_type_enforce<
		ReturnType< $yuf_login_form['password'] >
		,
		ReturnType< $yuf_password['value'] >
	>
	type $yuf_password__submit_yuf_login_form_10 = $mol_type_enforce<
		ReturnType< $yuf_login_form['submit_activate_fork'] >
		,
		ReturnType< $yuf_password['submit'] >
	>
	type $mol_form_field__bids_yuf_login_form_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_field['bids'] >
	>
	type $mol_form_field__name_yuf_login_form_12 = $mol_type_enforce<
		ReturnType< $yuf_login_form['password_label'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_login_form_13 = $mol_type_enforce<
		ReturnType< $yuf_login_form['Password'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $yuf_form_bid__value_yuf_login_form_14 = $mol_type_enforce<
		ReturnType< $yuf_login_form['value_str'] >
		,
		ReturnType< $yuf_form_bid['value'] >
	>
	export class $yuf_login_form extends $mol_form {
		value_str( id: any, next?: string ): string
		required( id: any): ReturnType< ReturnType< $yuf_login_form['Bid'] >['required'] >
		min( id: any): ReturnType< ReturnType< $yuf_login_form['Bid'] >['min'] >
		max( id: any): ReturnType< ReturnType< $yuf_login_form['Bid'] >['max'] >
		login_label( ): string
		login( next?: string ): string
		submit_activate_fork( next?: ReturnType< $yuf_login_form['submit_activate'] > ): ReturnType< $yuf_login_form['submit_activate'] >
		Login( ): $mol_string
		Login_field( ): $mol_form_field
		password_label( ): string
		password( next?: string ): string
		Password( ): $yuf_password
		Password_field( ): $mol_form_field
		form_fields_end( ): readonly($mol_view)[]
		login_error( ): string
		unknown_error( ): string
		enter( next?: any ): any
		Bid( ): $yuf_form_bid
		form_fields( ): readonly(any)[]
		submit_title( ): string
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $ {

	type $yuf_login_form__enter_yuf_login_form_demo_1 = $mol_type_enforce<
		ReturnType< $yuf_login_form_demo['enter'] >
		,
		ReturnType< $yuf_login_form['enter'] >
	>
	export class $yuf_login_form_demo extends $mol_example_small {
		enter( next?: any ): any
		login( ): ReturnType< ReturnType< $yuf_login_form_demo['Login_form'] >['login'] >
		password( ): ReturnType< ReturnType< $yuf_login_form_demo['Login_form'] >['password'] >
		Login_form( ): $yuf_login_form
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_calendar extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=calendar.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_calendar_today extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=today.view.tree.d.ts.map
declare namespace $ {

	export class $mol_format extends $mol_string {
		mask( id: any): string
		allow( ): string
		hint( ): ReturnType< $mol_format['mask'] >
		keyboard( ): string
	}
	
}

//# sourceMappingURL=format.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_trash_can extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=can.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_trash_can_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_hor extends $mol_view {
	}
	
}

//# sourceMappingURL=hor.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__minimal_height_mol_calendar_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_calendar_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_calendar_3 = $mol_type_enforce<
		ReturnType< $mol_calendar['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_hor__sub_mol_calendar_4 = $mol_type_enforce<
		ReturnType< $mol_calendar['weekdays'] >
		,
		ReturnType< $mol_hor['sub'] >
	>
	type $mol_calendar_day__holiday_mol_calendar_5 = $mol_type_enforce<
		ReturnType< $mol_calendar['weekend'] >
		,
		ReturnType< $mol_calendar_day['holiday'] >
	>
	type $mol_calendar_day__sub_mol_calendar_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_calendar_day['sub'] >
	>
	type $mol_hor__sub_mol_calendar_7 = $mol_type_enforce<
		ReturnType< $mol_calendar['week_days'] >
		,
		ReturnType< $mol_hor['sub'] >
	>
	type $mol_calendar_day__ghost_mol_calendar_8 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_ghost'] >
		,
		ReturnType< $mol_calendar_day['ghost'] >
	>
	type $mol_calendar_day__holiday_mol_calendar_9 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_holiday'] >
		,
		ReturnType< $mol_calendar_day['holiday'] >
	>
	type $mol_calendar_day__selected_mol_calendar_10 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_selected'] >
		,
		ReturnType< $mol_calendar_day['selected'] >
	>
	type $mol_calendar_day__today_mol_calendar_11 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_today'] >
		,
		ReturnType< $mol_calendar_day['today'] >
	>
	type $mol_calendar_day__theme_mol_calendar_12 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_theme'] >
		,
		ReturnType< $mol_calendar_day['theme'] >
	>
	type $mol_calendar_day__sub_mol_calendar_13 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_content'] >
		,
		ReturnType< $mol_calendar_day['sub'] >
	>
	export class $mol_calendar extends $mol_list {
		title( ): string
		Title( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		weekdays( ): readonly($mol_view)[]
		Weekdays( ): $mol_hor
		weekend( id: any): boolean
		weekday( id: any): string
		week_days( id: any): readonly($mol_view)[]
		day_ghost( id: any): boolean
		day_holiday( id: any): boolean
		day_selected( id: any): boolean
		day_today( id: any): boolean
		day_theme( id: any): any
		day_text( id: any): string
		day_content( id: any): readonly(any)[]
		sub( ): readonly(any)[]
		weeks( ): readonly($mol_view)[]
		weeks_count( ): number
		Weekday( id: any): $mol_calendar_day
		Week( id: any): $mol_hor
		Day( id: any): $mol_calendar_day
		month_string( ): string
		month_moment( ): $mol_time_moment
	}
	
	export class $mol_calendar_day extends $mol_view {
		holiday( ): boolean
		ghost( ): boolean
		selected( ): boolean
		today( ): boolean
		theme( ): any
		minimal_height( ): number
		minimal_width( ): number
		attr( ): ({ 
			'mol_calendar_holiday': ReturnType< $mol_calendar_day['holiday'] >,
			'mol_calendar_ghost': ReturnType< $mol_calendar_day['ghost'] >,
			'mol_calendar_selected': ReturnType< $mol_calendar_day['selected'] >,
			'mol_calendar_today': ReturnType< $mol_calendar_day['today'] >,
			'mol_theme': ReturnType< $mol_calendar_day['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=calendar.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__hint_mol_date_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_date_2 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_date_3 = $mol_type_enforce<
		ReturnType< $mol_date['today_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type __mol_date_5 = $mol_type_enforce<
		Parameters< $mol_date['value_changed'] >[0]
		,
		Parameters< ReturnType< $mol_date['Input'] >['value_changed'] >[0]
	>
	type $mol_format__value_mol_date_6 = $mol_type_enforce<
		ReturnType< $mol_date['value'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_format__mask_mol_date_7 = $mol_type_enforce<
		ReturnType< $mol_date['input_mask'] >
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__enabled_mol_date_8 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_format['enabled'] >
	>
	type $mol_button_minor__hint_mol_date_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_date_10 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_date_11 = $mol_type_enforce<
		ReturnType< $mol_date['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_date_13 = $mol_type_enforce<
		ReturnType< $mol_date['input_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint_mol_date_14 = $mol_type_enforce<
		ReturnType< $mol_date['prev_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_date_15 = $mol_type_enforce<
		ReturnType< $mol_date['prev'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint_mol_date_17 = $mol_type_enforce<
		ReturnType< $mol_date['next_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_date_18 = $mol_type_enforce<
		ReturnType< $mol_date['next'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_date_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_date_calendar__enabled_mol_date_21 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_date_calendar['enabled'] >
	>
	type $mol_date_calendar__month_moment_mol_date_22 = $mol_type_enforce<
		ReturnType< $mol_date['month_moment'] >
		,
		ReturnType< $mol_date_calendar['month_moment'] >
	>
	type $mol_date_calendar__day_selected_mol_date_23 = $mol_type_enforce<
		ReturnType< $mol_date['day_selected'] >
		,
		ReturnType< $mol_date_calendar['day_selected'] >
	>
	type $mol_date_calendar__day_click_mol_date_24 = $mol_type_enforce<
		ReturnType< $mol_date['day_click'] >
		,
		ReturnType< $mol_date_calendar['day_click'] >
	>
	type $mol_date_calendar__head_mol_date_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_date_calendar['head'] >
	>
	export class $mol_date extends $mol_pick {
		enabled( ): boolean
		today_click( next?: any ): any
		Today_icon( ): $mol_icon_calendar_today
		Today( ): $mol_button_minor
		value( next?: string ): string
		value_changed( next?: ReturnType< ReturnType< $mol_date['Input'] >['value_changed'] > ): ReturnType< ReturnType< $mol_date['Input'] >['value_changed'] >
		input_mask( id: any): string
		Input( ): $mol_format
		clear( next?: any ): any
		Clear_icon( ): $mol_icon_trash_can_outline
		Clear( ): $mol_button_minor
		input_content( ): readonly(any)[]
		Input_row( ): $mol_view
		month_moment( ): ReturnType< $mol_date['value_moment'] >
		day_selected( id: any): boolean
		day_click( id: any, next?: any ): any
		Calendar_title( ): ReturnType< ReturnType< $mol_date['Calendar'] >['Title'] >
		prev_hint( ): string
		prev( next?: any ): any
		Prev_icon( ): $mol_icon_chevron_left
		Prev( ): $mol_button_minor
		next_hint( ): string
		next( next?: any ): any
		Next_icon( ): $mol_icon_chevron_right
		Next( ): $mol_button_minor
		Calendar_tools( ): $mol_view
		Calendar( ): $mol_date_calendar
		Icon( ): $mol_icon_calendar
		bubble_content( ): readonly(any)[]
		value_number( next?: number ): number
		value_moment( next?: $mol_time_moment ): $mol_time_moment
	}
	
	type $mol_button_minor__title_mol_date_calendar_1 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['day_text'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__event_click_mol_date_calendar_2 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['day_click'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__minimal_height_mol_date_calendar_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_button_minor['minimal_height'] >
	>
	type $mol_button_minor__enabled_mol_date_calendar_4 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	export class $mol_date_calendar extends $mol_calendar {
		day_click( id: any, next?: any ): any
		enabled( ): boolean
		Day_button( id: any): $mol_button_minor
		day_content( id: any): readonly(any)[]
	}
	
}

//# sourceMappingURL=date.view.tree.d.ts.map
declare namespace $ {

	type $yuf_date_range_date__align_yuf_date_range_1 = $mol_type_enforce<
		ReturnType< $yuf_date_range['from_align'] >
		,
		ReturnType< $yuf_date_range_date['align'] >
	>
	type $yuf_date_range_date__value_moment_yuf_date_range_2 = $mol_type_enforce<
		ReturnType< $yuf_date_range['from'] >
		,
		ReturnType< $yuf_date_range_date['value_moment'] >
	>
	type $mol_view__sub_yuf_date_range_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_date_range_date__align_yuf_date_range_4 = $mol_type_enforce<
		ReturnType< $yuf_date_range['to_align'] >
		,
		ReturnType< $yuf_date_range_date['align'] >
	>
	type $yuf_date_range_date__value_moment_yuf_date_range_5 = $mol_type_enforce<
		ReturnType< $yuf_date_range['to'] >
		,
		ReturnType< $yuf_date_range_date['value_moment'] >
	>
	export class $yuf_date_range extends $mol_view {
		from_align( ): string
		from( next?: $mol_time_moment ): $mol_time_moment
		From( ): $yuf_date_range_date
		separator( ): string
		Separator( ): $mol_view
		to_align( ): string
		to( next?: $mol_time_moment ): $mol_time_moment
		To( ): $yuf_date_range_date
		sub( ): readonly(any)[]
	}
	
	export class $yuf_date_range_date extends $mol_date {
	}
	
}

//# sourceMappingURL=range.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_date_range_demo extends $mol_example_small {
		Current( ): $yuf_date_range
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__minimal_height_yuf_bug_log_prepend_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_yuf_bug_log_prepend_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_yuf_bug_log_prepend_3 = $mol_type_enforce<
		ReturnType< $yuf_bug_log_prepend['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $yuf_bug_log_prepend extends $mol_example_small {
		log_row( id: any): string
		Log( id: any): $mol_view
		rows( ): readonly($mol_view)[]
		List( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=prepend.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_bug_catalog_flash extends $mol_example_small {
		Main( ): $yuf_bug_catalog_flash_catalog
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
	type $mol_button_major__sub_yuf_bug_catalog_flash_catalog_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_button_major__click_yuf_bug_catalog_flash_catalog_2 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['last_event'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_minor__sub_yuf_bug_catalog_flash_catalog_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_yuf_bug_catalog_flash_catalog_4 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['last_event2'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_hotkey__key_yuf_bug_catalog_flash_catalog_5 = $mol_type_enforce<
		({ 
			up( next?: ReturnType< $yuf_bug_catalog_flash_catalog['select_key'] > ): ReturnType< $yuf_bug_catalog_flash_catalog['select_key'] >,
			down( next?: ReturnType< $yuf_bug_catalog_flash_catalog['select_key'] > ): ReturnType< $yuf_bug_catalog_flash_catalog['select_key'] >,
			left( next?: ReturnType< $yuf_bug_catalog_flash_catalog['select_key'] > ): ReturnType< $yuf_bug_catalog_flash_catalog['select_key'] >,
			right( next?: ReturnType< $yuf_bug_catalog_flash_catalog['select_key'] > ): ReturnType< $yuf_bug_catalog_flash_catalog['select_key'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_list__item_height_min_yuf_bug_catalog_flash_catalog_6 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_list['item_height_min'] >
	>
	type $mol_list__Empty_yuf_bug_catalog_flash_catalog_7 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['Menu_links_empty'] >
		,
		ReturnType< $mol_list['Empty'] >
	>
	type $mol_list__rows_yuf_bug_catalog_flash_catalog_8 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['menu_links'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__title_yuf_bug_catalog_flash_catalog_9 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['menu_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__Logo_yuf_bug_catalog_flash_catalog_10 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['Menu_logo'] >
		,
		ReturnType< $mol_page['Logo'] >
	>
	type $mol_page__tools_yuf_bug_catalog_flash_catalog_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__head_yuf_bug_catalog_flash_catalog_12 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['menu_head'] >
		,
		ReturnType< $mol_page['head'] >
	>
	type $mol_page__body_yuf_bug_catalog_flash_catalog_13 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['menu_body'] >
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot_yuf_bug_catalog_flash_catalog_14 = $mol_type_enforce<
		ReturnType< $yuf_bug_catalog_flash_catalog['menu_foot'] >
		,
		ReturnType< $mol_page['foot'] >
	>
	type $mol_page__plugins_yuf_bug_catalog_flash_catalog_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['plugins'] >
	>
	export class $yuf_bug_catalog_flash_catalog extends $mol_book2_catalog {
		last_event( next?: any ): any
		Shuffle( ): $mol_button_major
		last_event2( next?: any ): any
		Shuffle2( ): $mol_button_minor
		Menu_title( ): ReturnType< ReturnType< $yuf_bug_catalog_flash_catalog['Menu'] >['Title'] >
		Menu_tools( ): ReturnType< ReturnType< $yuf_bug_catalog_flash_catalog['Menu'] >['Tools'] >
		select_key( id: any, next?: any ): any
		Hotkey( ): $mol_hotkey
		title( ): string
		addon_tools( ): readonly(any)[]
		Menu_links( ): $mol_list
		Menu( ): $mol_page
	}
	
}

//# sourceMappingURL=flash.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_lights_toggle extends $mol_check {
		Icon( ): $mol_icon_brightness_4
		hint( ): string
	}
	
}

//# sourceMappingURL=toggle.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_content_duplicate extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=duplicate.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_content_save extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=save.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_content_save_all extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=all.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_download extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=download.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_download extends $mol_button_minor {
		Icon( ): $mol_icon_download
		title( ): string
		blob( ): any
		uri( ): string
		file_name( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=download.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_button_close extends $mol_button_minor {
		Icon( ): $mol_icon_close
		hint( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=close.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_theme_plugin extends $mol_theme_auto {
		light( ): string
		dark( ): string
	}
	
}

//# sourceMappingURL=plugin.view.tree.d.ts.map
declare namespace $ {

	type $mol_textarea_edit__value_mol_textarea_1 = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_textarea_edit['value'] >
	>
	type $mol_textarea_edit__hint_mol_textarea_2 = $mol_type_enforce<
		ReturnType< $mol_textarea['hint'] >
		,
		ReturnType< $mol_textarea_edit['hint'] >
	>
	type $mol_textarea_edit__enabled_mol_textarea_3 = $mol_type_enforce<
		ReturnType< $mol_textarea['enabled'] >
		,
		ReturnType< $mol_textarea_edit['enabled'] >
	>
	type $mol_textarea_edit__spellcheck_mol_textarea_4 = $mol_type_enforce<
		ReturnType< $mol_textarea['spellcheck'] >
		,
		ReturnType< $mol_textarea_edit['spellcheck'] >
	>
	type $mol_textarea_edit__length_max_mol_textarea_5 = $mol_type_enforce<
		ReturnType< $mol_textarea['length_max'] >
		,
		ReturnType< $mol_textarea_edit['length_max'] >
	>
	type $mol_textarea_edit__selection_mol_textarea_6 = $mol_type_enforce<
		ReturnType< $mol_textarea['selection'] >
		,
		ReturnType< $mol_textarea_edit['selection'] >
	>
	type $mol_textarea_edit__submit_mol_textarea_7 = $mol_type_enforce<
		ReturnType< $mol_textarea['submit'] >
		,
		ReturnType< $mol_textarea_edit['submit'] >
	>
	type $mol_textarea_edit__submit_with_ctrl_mol_textarea_8 = $mol_type_enforce<
		ReturnType< $mol_textarea['submit_with_ctrl'] >
		,
		ReturnType< $mol_textarea_edit['submit_with_ctrl'] >
	>
	type $mol_text_code__text_mol_textarea_9 = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__render_visible_only_mol_textarea_10 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code['render_visible_only'] >
	>
	type $mol_text_code__row_numb_mol_textarea_11 = $mol_type_enforce<
		ReturnType< $mol_textarea['row_numb'] >
		,
		ReturnType< $mol_text_code['row_numb'] >
	>
	type $mol_text_code__sidebar_showed_mol_textarea_12 = $mol_type_enforce<
		ReturnType< $mol_textarea['sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_text_code__highlight_mol_textarea_13 = $mol_type_enforce<
		ReturnType< $mol_textarea['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	type $mol_text_code__syntax_mol_textarea_14 = $mol_type_enforce<
		ReturnType< $mol_textarea['syntax'] >
		,
		ReturnType< $mol_text_code['syntax'] >
	>
	export class $mol_textarea extends $mol_stack {
		clickable( next?: boolean ): boolean
		sidebar_showed( ): boolean
		press( next?: any ): any
		hover( next?: any ): any
		value( next?: string ): string
		hint( ): string
		enabled( ): boolean
		spellcheck( ): boolean
		length_max( ): number
		selection( next?: readonly(number)[] ): readonly(number)[]
		bring( ): ReturnType< ReturnType< $mol_textarea['Edit'] >['bring'] >
		submit( next?: any ): any
		submit_with_ctrl( ): boolean
		Edit( ): $mol_textarea_edit
		row_numb( id: any): number
		highlight( ): string
		syntax( ): $mol_syntax2
		View( ): $mol_text_code
		attr( ): ({ 
			'mol_textarea_clickable': ReturnType< $mol_textarea['clickable'] >,
			'mol_textarea_sidebar_showed': ReturnType< $mol_textarea['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		event( ): ({ 
			keydown( next?: ReturnType< $mol_textarea['press'] > ): ReturnType< $mol_textarea['press'] >,
			pointermove( next?: ReturnType< $mol_textarea['hover'] > ): ReturnType< $mol_textarea['hover'] >,
		}) 
		sub( ): readonly(any)[]
		symbols_alt( ): Record<string, string>
		symbols_alt_ctrl( ): Record<string, string>
		symbols_alt_shift( ): Record<string, string>
	}
	
	export class $mol_textarea_edit extends $mol_string {
		dom_name( ): string
		enter( ): string
		field( ): ({ 
			'scrollTop': number,
		})  & ReturnType< $mol_string['field'] >
	}
	
}

//# sourceMappingURL=textarea.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_textarea extends $mol_textarea {
	}
	
}

//# sourceMappingURL=textarea.view.tree.d.ts.map
declare namespace $ {

	type $yuf_textarea__hint_yuf_localizer_settings_form_1 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['app_url_hint'] >
		,
		ReturnType< $yuf_textarea['hint'] >
	>
	type $yuf_textarea__value_yuf_localizer_settings_form_2 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['projects_urls_str'] >
		,
		ReturnType< $yuf_textarea['value'] >
	>
	type $mol_form_field__name_yuf_localizer_settings_form_3 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['app_url_name'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_localizer_settings_form_4 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['App_url'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_string__hint_yuf_localizer_settings_form_5 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['langs_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_yuf_localizer_settings_form_6 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['langs_available_str'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_yuf_localizer_settings_form_7 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['langs_name'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_localizer_settings_form_8 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['Langs'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $yuf_textarea__hint_yuf_localizer_settings_form_9 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['locales_data_hint'] >
		,
		ReturnType< $yuf_textarea['hint'] >
	>
	type $yuf_textarea__value_yuf_localizer_settings_form_10 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['locales_str'] >
		,
		ReturnType< $yuf_textarea['value'] >
	>
	type $mol_form_field__name_yuf_localizer_settings_form_11 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['locales_data_name'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_localizer_settings_form_12 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_form['Locales_data'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	export class $yuf_localizer_settings_form extends $mol_form {
		app_url_name( ): string
		app_url_hint( ): string
		projects_urls_str( next?: string ): string
		App_url( ): $yuf_textarea
		App_url_field( ): $mol_form_field
		langs_name( ): string
		langs_hint( ): string
		langs_available_str( next?: string ): string
		Langs( ): $mol_string
		Langs_field( ): $mol_form_field
		locales_data_name( ): string
		locales_data_hint( ): string
		locales_str( next?: string ): string
		Locales_data( ): $yuf_textarea
		Locales_data_field( ): $mol_form_field
		buttons( ): readonly(any)[]
		locales( next?: Record<string, any> ): Record<string, any>
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $ {

	type $yuf_localizer_settings_form__projects_urls_str_yuf_localizer_settings_page_1 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_page['projects_urls_str'] >
		,
		ReturnType< $yuf_localizer_settings_form['projects_urls_str'] >
	>
	type $yuf_localizer_settings_form__langs_available_str_yuf_localizer_settings_page_2 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_page['langs_available_str'] >
		,
		ReturnType< $yuf_localizer_settings_form['langs_available_str'] >
	>
	type $yuf_localizer_settings_form__locales_yuf_localizer_settings_page_3 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_page['locales'] >
		,
		ReturnType< $yuf_localizer_settings_form['locales'] >
	>
	type $yuf_localizer_settings_page_tools__4 = $mol_type_enforce<
		ReturnType< $yuf_localizer_settings_page['addon_tools'] >[number]
		,
		$mol_view
	>
	export class $yuf_localizer_settings_page extends $mol_page {
		addon_tools( ): readonly($mol_view)[]
		projects_urls_str( next?: string ): string
		langs_available_str( next?: string ): string
		locales( next?: Record<string, any> ): Record<string, any>
		Form( ): $yuf_localizer_settings_form
		title( ): string
		tools( ): readonly($mol_view)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_refresh extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=refresh.view.tree.d.ts.map
declare namespace $ {

	type __yuf_localizer_key_form_1 = $mol_type_enforce<
		Parameters< $yuf_localizer_key_form['text'] >[0]
		,
		Parameters< ReturnType< $yuf_localizer_key_form['model'] >['text'] >[0]
	>
	type $mol_button_minor__sub_yuf_localizer_key_form_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint_yuf_localizer_key_form_3 = $mol_type_enforce<
		ReturnType< $yuf_localizer_key_form['reset_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_yuf_localizer_key_form_4 = $mol_type_enforce<
		ReturnType< $yuf_localizer_key_form['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_string__enabled_yuf_localizer_key_form_5 = $mol_type_enforce<
		ReturnType< $yuf_localizer_key_form['text_edit_enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__value_yuf_localizer_key_form_6 = $mol_type_enforce<
		ReturnType< $yuf_localizer_key_form['text'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $yuf_localizer_key_form_field__name_yuf_localizer_key_form_7 = $mol_type_enforce<
		ReturnType< $yuf_localizer_key_form['text_name'] >
		,
		ReturnType< $yuf_localizer_key_form_field['name'] >
	>
	type $yuf_localizer_key_form_field__reset_content_yuf_localizer_key_form_8 = $mol_type_enforce<
		ReturnType< $yuf_localizer_key_form['reset_content'] >
		,
		ReturnType< $yuf_localizer_key_form_field['reset_content'] >
	>
	type $yuf_localizer_key_form_field__control_yuf_localizer_key_form_9 = $mol_type_enforce<
		ReturnType< $yuf_localizer_key_form['Text'] >
		,
		ReturnType< $yuf_localizer_key_form_field['control'] >
	>
	export class $yuf_localizer_key_form extends $mol_form {
		title( ): ReturnType< ReturnType< $yuf_localizer_key_form['model'] >['id'] >
		text( next?: ReturnType< ReturnType< $yuf_localizer_key_form['model'] >['text'] > ): ReturnType< ReturnType< $yuf_localizer_key_form['model'] >['text'] >
		is_new( ): ReturnType< ReturnType< $yuf_localizer_key_form['model'] >['is_new'] >
		is_not_used( ): ReturnType< ReturnType< $yuf_localizer_key_form['model'] >['is_not_used'] >
		text_actual( ): ReturnType< ReturnType< $yuf_localizer_key_form['model'] >['text_actual'] >
		lang_code( ): string
		text_name( ): ReturnType< $yuf_localizer_key_form['lang_code'] >
		Reset_icon( ): $mol_icon_refresh
		reset_hint( ): string
		reset( next?: any ): any
		Reset( ): $mol_button_minor
		reset_content( ): readonly($mol_view)[]
		text_edit_enabled( ): boolean
		Text( ): $mol_string
		Text_field( ): $yuf_localizer_key_form_field
		is_new_text( ): string
		is_not_used_text( ): string
		model( ): $yuf_localizer_key_model
		autofocus( ): boolean
		rows( ): readonly(any)[]
		body( ): readonly(any)[]
	}
	
	export class $yuf_localizer_key_form_field extends $mol_form_field {
		reset_content( ): readonly($mol_view)[]
		label( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $ {

	type $yuf_localizer_key_form__model_yuf_localizer_page_1 = $mol_type_enforce<
		ReturnType< $yuf_localizer_page['locale_by_lang_code'] >
		,
		ReturnType< $yuf_localizer_key_form['model'] >
	>
	type $yuf_localizer_key_form__autofocus_yuf_localizer_page_2 = $mol_type_enforce<
		ReturnType< $yuf_localizer_page['autofocus'] >
		,
		ReturnType< $yuf_localizer_key_form['autofocus'] >
	>
	type $yuf_localizer_key_form__lang_code_yuf_localizer_page_3 = $mol_type_enforce<
		ReturnType< $yuf_localizer_page['lang_code_id'] >
		,
		ReturnType< $yuf_localizer_key_form['lang_code'] >
	>
	type $yuf_localizer_page_tools__4 = $mol_type_enforce<
		ReturnType< $yuf_localizer_page['addon_tools'] >[number]
		,
		$mol_view_content
	>
	export class $yuf_localizer_page extends $mol_page {
		locale_key( ): string
		addon_tools( ): readonly($mol_view_content)[]
		locale_by_lang_code( id: any): $yuf_localizer_key_model
		autofocus( id: any): boolean
		lang_code_id( id: any): string
		Form( id: any): $yuf_localizer_key_form
		forms( ): readonly($mol_view)[]
		lang_code( ): string
		langs_available( ): readonly(string)[]
		project( ): $yuf_localizer_project_model | null
		title( ): ReturnType< $yuf_localizer_page['locale_key'] >
		tools( ): readonly($mol_view_content)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $ {

	type $mol_select__Trigger_icon_yuf_localizer_catalog_1 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Trigger_icon'] >
	>
	type $mol_select__hint_yuf_localizer_catalog_2 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['selected_project_hint'] >
		,
		ReturnType< $mol_select['hint'] >
	>
	type $mol_select__options_yuf_localizer_catalog_3 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['projects_urls'] >
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_select__value_yuf_localizer_catalog_4 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['project_url'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $yuf_lights_toggle__hint_yuf_localizer_catalog_5 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['version'] >
		,
		ReturnType< $yuf_lights_toggle['hint'] >
	>
	type $mol_check_icon__Icon_yuf_localizer_catalog_6 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['Settings_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__hint_yuf_localizer_catalog_7 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['settings_check_hint'] >
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__checked_yuf_localizer_catalog_8 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['settings_checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_view__sub_yuf_localizer_catalog_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_select__hint_yuf_localizer_catalog_10 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['selected_lang_hint'] >
		,
		ReturnType< $mol_select['hint'] >
	>
	type $mol_select__options_yuf_localizer_catalog_11 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['langs_available'] >
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_select__value_yuf_localizer_catalog_12 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['lang_code'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__hint_yuf_localizer_catalog_13 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['key_filter_hint'] >
		,
		ReturnType< $mol_select['hint'] >
	>
	type $mol_select__Filter_yuf_localizer_catalog_14 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__dictionary_yuf_localizer_catalog_15 = $mol_type_enforce<
		({ 
			'': ReturnType< $yuf_localizer_catalog['all_msg'] >,
			'is_new': ReturnType< $yuf_localizer_catalog['is_new_msg'] >,
			'empty': ReturnType< $yuf_localizer_catalog['empty_msg'] >,
			'changed': ReturnType< $yuf_localizer_catalog['changed_msg'] >,
			'is_not_used': ReturnType< $yuf_localizer_catalog['is_not_used_msg'] >,
		}) 
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_select__value_yuf_localizer_catalog_16 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['keys_filter'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_check_icon__Icon_yuf_localizer_catalog_17 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['Dupes_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__hint_yuf_localizer_catalog_18 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['dupes_hint'] >
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__checked_yuf_localizer_catalog_19 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['dupes_only'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_button_download__blob_yuf_localizer_catalog_20 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_file_blob'] >
		,
		ReturnType< $mol_button_download['blob'] >
	>
	type $mol_button_download__enabled_yuf_localizer_catalog_21 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['diff_to_clipboard_enabled'] >
		,
		ReturnType< $mol_button_download['enabled'] >
	>
	type $mol_button_download__file_name_yuf_localizer_catalog_22 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_file_all_name'] >
		,
		ReturnType< $mol_button_download['file_name'] >
	>
	type $mol_button_download__title_yuf_localizer_catalog_23 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_file_all_hint'] >
		,
		ReturnType< $mol_button_download['title'] >
	>
	type $mol_button_copy__title_yuf_localizer_catalog_24 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_copypaste_all_hint'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__enabled_yuf_localizer_catalog_25 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['diff_to_clipboard_enabled'] >
		,
		ReturnType< $mol_button_copy['enabled'] >
	>
	type $mol_button_copy__text_yuf_localizer_catalog_26 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_file_json'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	type $mol_button_download__blob_yuf_localizer_catalog_27 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_file_blob'] >
		,
		ReturnType< $mol_button_download['blob'] >
	>
	type $mol_button_download__file_name_yuf_localizer_catalog_28 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_file_whole_name'] >
		,
		ReturnType< $mol_button_download['file_name'] >
	>
	type $mol_button_download__title_yuf_localizer_catalog_29 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_file_whole_hint'] >
		,
		ReturnType< $mol_button_download['title'] >
	>
	type $mol_button_copy__title_yuf_localizer_catalog_30 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_copypaste_hint'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__text_yuf_localizer_catalog_31 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_file_json'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	type $mol_list__rows_yuf_localizer_catalog_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pick__hint_yuf_localizer_catalog_33 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__trigger_content_yuf_localizer_catalog_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_yuf_localizer_catalog_35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_text__text_yuf_localizer_catalog_36 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['description'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_page__title_yuf_localizer_catalog_37 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['description_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__body_yuf_localizer_catalog_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $yuf_button_close__click_yuf_localizer_catalog_39 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['settings_close'] >
		,
		ReturnType< $yuf_button_close['click'] >
	>
	type __yuf_localizer_catalog_40 = $mol_type_enforce<
		Parameters< $yuf_localizer_catalog['locales'] >[0]
		,
		Parameters< ReturnType< $yuf_localizer_catalog['projects'] >['locales'] >[0]
	>
	type $mol_hotkey__key_yuf_localizer_catalog_41 = $mol_type_enforce<
		({ 
			up( next?: ReturnType< $yuf_localizer_catalog['select_key'] > ): ReturnType< $yuf_localizer_catalog['select_key'] >,
			down( next?: ReturnType< $yuf_localizer_catalog['select_key'] > ): ReturnType< $yuf_localizer_catalog['select_key'] >,
			left( next?: ReturnType< $yuf_localizer_catalog['select_key'] > ): ReturnType< $yuf_localizer_catalog['select_key'] >,
			right( next?: ReturnType< $yuf_localizer_catalog['select_key'] > ): ReturnType< $yuf_localizer_catalog['select_key'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $yuf_localizer_settings_page__addon_tools_yuf_localizer_catalog_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_localizer_settings_page['addon_tools'] >
	>
	type $yuf_localizer_settings_page__projects_urls_str_yuf_localizer_catalog_43 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['val_str'] >
		,
		ReturnType< $yuf_localizer_settings_page['projects_urls_str'] >
	>
	type $yuf_localizer_settings_page__langs_available_str_yuf_localizer_catalog_44 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['val_str'] >
		,
		ReturnType< $yuf_localizer_settings_page['langs_available_str'] >
	>
	type $yuf_localizer_settings_page__locales_yuf_localizer_catalog_45 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locales'] >
		,
		ReturnType< $yuf_localizer_settings_page['locales'] >
	>
	type $yuf_localizer_page__locale_key_yuf_localizer_catalog_46 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['locale_key'] >
		,
		ReturnType< $yuf_localizer_page['locale_key'] >
	>
	type $yuf_localizer_page__langs_available_yuf_localizer_catalog_47 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['langs_available'] >
		,
		ReturnType< $yuf_localizer_page['langs_available'] >
	>
	type $yuf_localizer_page__lang_code_yuf_localizer_catalog_48 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['lang_code'] >
		,
		ReturnType< $yuf_localizer_page['lang_code'] >
	>
	type $yuf_localizer_page__project_yuf_localizer_catalog_49 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['project'] >
		,
		ReturnType< $yuf_localizer_page['project'] >
	>
	type $yuf_localizer_page__addon_tools_yuf_localizer_catalog_50 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_localizer_page['addon_tools'] >
	>
	type $yuf_link__arg_yuf_localizer_catalog_51 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['arg'] >
		,
		ReturnType< $yuf_link['arg'] >
	>
	type $yuf_link__default_yuf_localizer_catalog_52 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['menu_link_default'] >
		,
		ReturnType< $yuf_link['default'] >
	>
	type $yuf_link__hint_yuf_localizer_catalog_53 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['menu_link_hint'] >
		,
		ReturnType< $yuf_link['hint'] >
	>
	type $yuf_link__content_yuf_localizer_catalog_54 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['menu_link_content'] >
		,
		ReturnType< $yuf_link['content'] >
	>
	type $mol_view__sub_yuf_localizer_catalog_55 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['empty_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_page__title_yuf_localizer_catalog_56 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['menu_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__Logo_yuf_localizer_catalog_57 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['Menu_logo'] >
		,
		ReturnType< $mol_page['Logo'] >
	>
	type $mol_page__tools_yuf_localizer_catalog_58 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__head_yuf_localizer_catalog_59 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['menu_head'] >
		,
		ReturnType< $mol_page['head'] >
	>
	type $mol_page__body_yuf_localizer_catalog_60 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['menu_body'] >
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot_yuf_localizer_catalog_61 = $mol_type_enforce<
		ReturnType< $yuf_localizer_catalog['menu_foot'] >
		,
		ReturnType< $mol_page['foot'] >
	>
	type $mol_page__plugins_yuf_localizer_catalog_62 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['plugins'] >
	>
	export class $yuf_localizer_catalog extends $yuf_catalog {
		selected_project_hint( ): string
		projects_urls( ): readonly(string)[]
		project_url( next?: string ): string
		Selected_project( ): $mol_select
		version( ): string
		Lights( ): $yuf_lights_toggle
		Settings_icon( ): $mol_icon_settings
		settings_check_hint( ): string
		settings_checked( next?: boolean ): boolean
		Settings_check( ): $mol_check_icon
		Foot_tools( ): $mol_view
		selected_lang_hint( ): string
		langs_available( ): readonly(string)[]
		lang_code( next?: string ): string
		Selected_lang( ): $mol_select
		key_filter_hint( ): string
		all_msg( ): string
		is_new_msg( ): string
		empty_msg( ): string
		changed_msg( ): string
		is_not_used_msg( ): string
		keys_filter( next?: string ): string
		Keys_filter( ): $mol_select
		Dupes_icon( ): $mol_icon_content_duplicate
		dupes_hint( ): string
		dupes_only( next?: boolean ): boolean
		Dupes( ): $mol_check_icon
		Save_trigger_icon( ): $mol_icon_content_save_all
		diff_to_clipboard_enabled( ): boolean
		locale_file_all_name_tpl( ): string
		locale_file_all_name( ): ReturnType< $yuf_localizer_catalog['locale_file_all_name_tpl'] >
		locale_file_all_hint( ): string
		Locale_file_all_download( ): $mol_button_download
		locale_copypaste_all_hint( ): string
		Locale_copypaste_all( ): $mol_button_copy
		locale_file_blob( id: any): Blob | null
		locale_file_whole_name_tpl( ): string
		locale_file_whole_name( ): ReturnType< $yuf_localizer_catalog['locale_file_whole_name_tpl'] >
		locale_file_whole_hint( ): string
		Locale_file_whole_download( ): $mol_button_download
		locale_copypaste_hint( ): string
		locale_file_json( id: any): string
		Locale_copypaste( ): $mol_button_copy
		Save_content( ): $mol_list
		Save( ): $mol_pick
		description_title( ): string
		description( ): string
		Description_list( ): $mol_text
		Description_page( ): $mol_page
		settings_close( next?: any ): any
		Settings_close( ): $yuf_button_close
		val_str( id: any, next?: string ): string
		locales( next?: ReturnType< ReturnType< $yuf_localizer_catalog['projects'] >['locales'] > ): ReturnType< ReturnType< $yuf_localizer_catalog['projects'] >['locales'] >
		locale_key( id: any): string
		project( ): $yuf_localizer_project_model | null
		setup_needed( ): string
		not_found_keys( ): string
		empty_content( ): readonly($mol_view_content)[]
		Menu_title( ): ReturnType< ReturnType< $yuf_localizer_catalog['Menu'] >['Title'] >
		Menu_tools( ): ReturnType< ReturnType< $yuf_localizer_catalog['Menu'] >['Tools'] >
		select_key( id: any, next?: any ): any
		Hotkey( ): $mol_hotkey
		Theme( ): $yuf_theme_plugin
		menu_title( ): string
		param_prefix( ): string
		param_suffix( ): string
		menu_foot( ): readonly(any)[]
		menu_tools( ): readonly(any)[]
		placeholders( ): readonly(any)[]
		Settings( ): $yuf_localizer_settings_page
		projects( ): $yuf_localizer_project_store
		Spread( id: any): $yuf_localizer_page
		Menu_link( id: any): $yuf_link
		item_theme_not_used( ): string
		item_theme_new( ): string
		item_theme_changed( ): string
		Menu_links_empty( ): $mol_view
		Menu( ): $mol_page
	}
	
	export class $yuf_localizer_catalog_link extends $yuf_link {
		unselectable( ): boolean
	}
	
}

//# sourceMappingURL=catalog.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_localizer_demo extends $mol_example_large {
		Localizer( ): $yuf_localizer_catalog
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type __yuf_locale_switch_1 = $mol_type_enforce<
		Parameters< $yuf_locale_switch['lang'] >[0]
		,
		Parameters< ReturnType< $yuf_locale_switch['model'] >['lang'] >[0]
	>
	export class $yuf_locale_switch extends $mol_select {
		langs_available( ): ReturnType< ReturnType< $yuf_locale_switch['model'] >['langs_available'] >
		lang( next?: ReturnType< ReturnType< $yuf_locale_switch['model'] >['lang'] > ): ReturnType< ReturnType< $yuf_locale_switch['model'] >['lang'] >
		Filter( ): any
		model( ): $yuf_locale_model
		dictionary( ): ReturnType< $yuf_locale_switch['langs_available'] >
		value( next?: ReturnType< $yuf_locale_switch['lang'] > ): ReturnType< $yuf_locale_switch['lang'] >
	}
	
}

//# sourceMappingURL=switch.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_yuf_catalog_app_1 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['foot_first_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_lights_toggle__hint_yuf_catalog_app_2 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['version'] >
		,
		ReturnType< $yuf_lights_toggle['hint'] >
	>
	type $yuf_catalog_app_foot_second_content__3 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['foot_second_post'] >[number]
		,
		$mol_view
	>
	type $mol_view__sub_yuf_catalog_app_4 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['foot_second_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__sub_yuf_catalog_app_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_yuf_catalog_app_6 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['logout_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $yuf_catalog_app_menu_links_authorized__7 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['menu_links'] >[number]
		,
		$mol_view
	>
	type $mol_page__Logo_yuf_catalog_app_8 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['Menu_logo'] >
		,
		ReturnType< $mol_page['Logo'] >
	>
	type $mol_page__title_yuf_catalog_app_9 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['login_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__body_yuf_catalog_app_10 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['login_body'] >
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot_yuf_catalog_app_11 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['menu_foot_public'] >
		,
		ReturnType< $mol_page['foot'] >
	>
	type $yuf_catalog_app_menu_foot__12 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['menu_foot_public'] >[number]
		,
		$mol_view
	>
	type $mol_list__Empty_yuf_catalog_app_13 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['Menu_links_empty'] >
		,
		ReturnType< $mol_list['Empty'] >
	>
	type $yuf_catalog_app_Menu_links__15 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['menu_links_no_authorized'] >[number]
		,
		$mol_view
	>
	type $yuf_catalog_app_Menu_links__16 = $mol_type_enforce<
		ReturnType< $yuf_catalog_app['menu_links_authorized'] >[number]
		,
		$mol_view
	>
	type $mol_list__rows_yuf_catalog_app_14 = $mol_type_enforce<
		readonly($mol_view)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $yuf_catalog_app extends $yuf_catalog {
		Placeholder_no_authorized( ): $mol_view
		login_title( ): string
		login_body( ): readonly($mol_view)[]
		foot_first_content( ): readonly($mol_view)[]
		Foot_first( ): $mol_view
		version( ): string
		Lights( ): $yuf_lights_toggle
		Locale_switch( ): $yuf_locale_switch
		foot_second_post( ): readonly($mol_view)[]
		foot_second_content( ): readonly($mol_view)[]
		Foot_second( ): $mol_view
		menu_foot_public( ): readonly($mol_view)[]
		menu_links_no_authorized( ): readonly($mol_view)[]
		log_out_title( ): string
		logout_click( next?: any ): any
		Log_out( ): $mol_button_minor
		menu_links_authorized( ): readonly($mol_view)[]
		Theme( ): $yuf_theme_plugin
		logged( next?: boolean ): boolean
		logout( next?: any ): any
		enter( next?: any ): any
		placeholders_page( ): readonly($mol_view)[]
		placeholders_no_authorized( ): readonly($mol_view)[]
		Login( ): $mol_page
		menu_foot( ): readonly($mol_view)[]
		Menu_links( ): $mol_list
		menu_filter_enabled( ): boolean
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_check extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_content_save_alert extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=alert.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_sync extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=sync.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_sync_alert extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=alert.view.tree.d.ts.map
declare namespace $ {

	type $mol_speck__event_yuf_status_1 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $yuf_status['reset_error'] > ): ReturnType< $yuf_status['reset_error'] >,
		}) 
		,
		ReturnType< $mol_speck['event'] >
	>
	type $mol_speck__value_yuf_status_2 = $mol_type_enforce<
		ReturnType< $yuf_status['error_message'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	type $yuf_status_sub__3 = $mol_type_enforce<
		ReturnType< $yuf_status['error_content'] >[number]
		,
		$mol_view
	>
	type $yuf_status_sub__4 = $mol_type_enforce<
		ReturnType< $yuf_status['icon_content'] >[number]
		,
		$mol_view
	>
	export class $yuf_status extends $mol_view {
		mol_view_error( ): any
		status_formatted( ): ReturnType< $yuf_status['title'] >
		title_formatted( ): ReturnType< $yuf_status['status_formatted'] >
		reset_error( next?: any ): any
		error_message( ): string
		Error( ): $mol_speck
		error_content( ): readonly($mol_view)[]
		Icon_ok( ): $mol_icon_check
		Icon_loading( ): $mol_icon_content_save_alert
		Icon_error( ): $mol_icon_sync_alert
		icon_content( ): readonly($mol_view)[]
		attr( ): ({ 
			'mol_view_error': ReturnType< $yuf_status['mol_view_error'] >,
			'title': ReturnType< $yuf_status['title_formatted'] >,
		})  & ReturnType< $mol_view['attr'] >
		error( next?: any ): any
		title( ): string
		status( ): string
		status_message( ): Record<string, string>
		sub( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=status.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_sync_off extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=off.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_ws_icon extends $mol_icon_sync {
		Error_icon( ): $mol_icon_sync_off
		Open_icon( ): $mol_icon_sync
		Connecting_icon( ): $mol_icon_sync_alert
		status( ): string
		status_icon( ): Record<string, $mol_icon>
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	type $yuf_ws_icon__status_yuf_ws_status_1 = $mol_type_enforce<
		ReturnType< $yuf_ws_status['status'] >
		,
		ReturnType< $yuf_ws_icon['status'] >
	>
	export class $yuf_ws_status extends $yuf_status {
		error( ): ReturnType< ReturnType< $yuf_ws_status['ws'] >['error'] >
		error_message( ): ReturnType< ReturnType< $yuf_ws_status['ws'] >['error_message'] >
		Icon_ws( ): $yuf_ws_icon
		ws( ): $yuf_ws_host
		title( ): string
		status_message( ): ({ 
			'error': string,
			'open': string,
			'connecting': string,
		}) 
		icon_content( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=status.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_edit extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=edit.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_restore extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=restore.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__hint_mol_form_draft_1 = $mol_type_enforce<
		ReturnType< $mol_form_draft['reset_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_mol_form_draft_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_mol_form_draft_3 = $mol_type_enforce<
		ReturnType< $mol_form_draft['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	export class $mol_form_draft extends $mol_form {
		reset_title( ): string
		Reset_icon( ): $mol_icon_restore
		Reset( ): $mol_button_minor
		model( ): $mol_object2
		model_pick( id: any, next?: any ): any
		changed( ): boolean
		state( next?: $mol_form_draft_state | null ): $mol_form_draft_state | null
		state_pick( id: any, next?: any ): any
		value( id: any, next?: any ): any
		value_str( id: any, next?: string ): string
		value_bool( id: any, next?: boolean ): boolean
		value_number( id: any, next?: number ): number
		dictionary_bool( id: any, next?: Record<string, any> ): Record<string, any>
		list_string( id: any, next?: readonly(string)[] ): readonly(string)[]
		value_changed( id: any): boolean
		reset( next?: any ): any
		done( next?: any ): any
		buttons( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=draft.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_yuf_karaoke_form_1 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['value_str'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_yuf_karaoke_form_2 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['title_name'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_karaoke_form_3 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['Title'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_string__value_yuf_karaoke_form_4 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['value_str'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_yuf_karaoke_form_5 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['audio_url_name'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_karaoke_form_6 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['Audio_url'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $yuf_textarea__syntax_yuf_karaoke_form_7 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['lyrics_syntax'] >
		,
		ReturnType< $yuf_textarea['syntax'] >
	>
	type $yuf_textarea__value_yuf_karaoke_form_8 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['value_str'] >
		,
		ReturnType< $yuf_textarea['value'] >
	>
	type $mol_form_field__name_yuf_karaoke_form_9 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['lyrics_name'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_yuf_karaoke_form_10 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_form['Lyrics'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	export class $yuf_karaoke_form extends $mol_form_draft {
		title_name( ): string
		Title( ): $mol_string
		Title_field( ): $mol_form_field
		title_field_content( ): readonly(any)[]
		audio_url_name( ): string
		Audio_url( ): $mol_string
		Audio_url_field( ): $mol_form_field
		lyrics_name( ): string
		lyrics_syntax( ): any
		Lyrics( ): $yuf_textarea
		Lyrics_field( ): $mol_form_field
		model( ): $yuf_karaoke_model
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $ {

	type $yuf_karaoke_text_group__ids_yuf_karaoke_text_1 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_text['ids'] >
		,
		ReturnType< $yuf_karaoke_text_group['ids'] >
	>
	type $yuf_karaoke_text_group__hilited_length_yuf_karaoke_text_2 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_text['hilited_length'] >
		,
		ReturnType< $yuf_karaoke_text_group['hilited_length'] >
	>
	type $yuf_karaoke_text_group__row_text_yuf_karaoke_text_3 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_text['row_text'] >
		,
		ReturnType< $yuf_karaoke_text_group['row_text'] >
	>
	export class $yuf_karaoke_text extends $mol_view {
		ids( id: any): readonly(readonly[number,number])[]
		hilited_length( id: any): number
		row_text( id: any): string
		Group( id: any): $yuf_karaoke_text_group
		group_content( ): readonly($mol_view)[]
		uri( ): string
		time( ): number
		sub( ): readonly(any)[]
	}
	
	type $yuf_karaoke_text_row__hilited_length_yuf_karaoke_text_group_1 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_text_group['hilited_length'] >
		,
		ReturnType< $yuf_karaoke_text_row['hilited_length'] >
	>
	type $yuf_karaoke_text_row__text_yuf_karaoke_text_group_2 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_text_group['row_text'] >
		,
		ReturnType< $yuf_karaoke_text_row['text'] >
	>
	export class $yuf_karaoke_text_group extends $mol_view {
		hilited_length( id: any): number
		row_text( id: any): string
		Row( id: any): $yuf_karaoke_text_row
		row_content( ): readonly($mol_view)[]
		ids( ): readonly(readonly[number,number])[]
		sub( ): readonly(any)[]
	}
	
	type $mol_view__dom_name_yuf_karaoke_text_row_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_yuf_karaoke_text_row_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $yuf_karaoke_text_row extends $mol_view {
		hilited_prefix( ): string
		Hilited( ): $mol_view
		text( ): string
		content( ): readonly(any)[]
		hilited_length( ): number
		sub( ): ReturnType< $yuf_karaoke_text_row['content'] >
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_play extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=play.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_video_play extends $yuf_check_icon2 {
		hint_checked( ): string
		hint_unchecked( ): string
		Icon_checked( ): $mol_icon_pause
		Icon_unchecked( ): $mol_icon_play
	}
	
}

//# sourceMappingURL=play.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_arrow_collapse extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=collapse.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_arrow_collapse_all extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=all.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_arrow_expand extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=expand.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_arrow_expand_all extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=all.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_video_full extends $yuf_check_icon2 {
		hint_checked( ): string
		hint_unchecked( ): string
		Icon_checked( ): $mol_icon_arrow_collapse_all
		Icon_unchecked( ): $mol_icon_arrow_expand_all
	}
	
}

//# sourceMappingURL=full.view.tree.d.ts.map
declare namespace $ {

	type $yuf_number_string__blur_event_yuf_number_1 = $mol_type_enforce<
		ReturnType< $yuf_number['blur_event'] >
		,
		ReturnType< $yuf_number_string['blur_event'] >
	>
	type $yuf_number_string__type_yuf_number_2 = $mol_type_enforce<
		ReturnType< $yuf_number['type'] >
		,
		ReturnType< $yuf_number_string['type'] >
	>
	type $yuf_number_string__value_yuf_number_3 = $mol_type_enforce<
		ReturnType< $yuf_number['value_string'] >
		,
		ReturnType< $yuf_number_string['value'] >
	>
	type $yuf_number_string__hint_yuf_number_4 = $mol_type_enforce<
		ReturnType< $yuf_number['hint'] >
		,
		ReturnType< $yuf_number_string['hint'] >
	>
	type $yuf_number_string__enabled_yuf_number_5 = $mol_type_enforce<
		ReturnType< $yuf_number['string_enabled'] >
		,
		ReturnType< $yuf_number_string['enabled'] >
	>
	type $yuf_number_string__submit_yuf_number_6 = $mol_type_enforce<
		ReturnType< $yuf_number['submit'] >
		,
		ReturnType< $yuf_number_string['submit'] >
	>
	export class $yuf_number extends $mol_number {
		blur_event( next?: any ): any
		String( ): $yuf_number_string
	}
	
	export class $yuf_number_string extends $mol_string {
		blur_event( next?: any ): any
		event( ): ({ 
			blur( next?: ReturnType< $yuf_number_string['blur_event'] > ): ReturnType< $yuf_number_string['blur_event'] >,
		})  & ReturnType< $mol_string['event'] >
	}
	
}

//# sourceMappingURL=number.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_minus extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=minus.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_plus extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=plus.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_number_range_string extends $mol_string {
		step( ): number
		min( ): number
		max( ): number
		type( ): string
		keyboard( ): string
		attr( ): ({ 
			'title': ReturnType< $yuf_number_range_string['hint'] >,
		})  & ReturnType< $mol_string['attr'] >
		field( ): ({ 
			'step': ReturnType< $yuf_number_range_string['step'] >,
			'min': ReturnType< $yuf_number_range_string['min'] >,
			'max': ReturnType< $yuf_number_range_string['max'] >,
		})  & ReturnType< $mol_string['field'] >
	}
	
}

//# sourceMappingURL=string.view.tree.d.ts.map
declare namespace $ {

	type $yuf_number_range_string__type_yuf_number_range_1 = $mol_type_enforce<
		ReturnType< $yuf_number_range['type'] >
		,
		ReturnType< $yuf_number_range_string['type'] >
	>
	type $yuf_number_range_string__value_yuf_number_range_2 = $mol_type_enforce<
		ReturnType< $yuf_number_range['value_string'] >
		,
		ReturnType< $yuf_number_range_string['value'] >
	>
	type $yuf_number_range_string__hint_yuf_number_range_3 = $mol_type_enforce<
		ReturnType< $yuf_number_range['hint'] >
		,
		ReturnType< $yuf_number_range_string['hint'] >
	>
	type $yuf_number_range_string__enabled_yuf_number_range_4 = $mol_type_enforce<
		ReturnType< $yuf_number_range['string_enabled'] >
		,
		ReturnType< $yuf_number_range_string['enabled'] >
	>
	type $yuf_number_range_string__submit_yuf_number_range_5 = $mol_type_enforce<
		ReturnType< $yuf_number_range['submit'] >
		,
		ReturnType< $yuf_number_range_string['submit'] >
	>
	type $yuf_number_range_string__min_yuf_number_range_6 = $mol_type_enforce<
		ReturnType< $yuf_number_range['value_min'] >
		,
		ReturnType< $yuf_number_range_string['min'] >
	>
	type $yuf_number_range_string__max_yuf_number_range_7 = $mol_type_enforce<
		ReturnType< $yuf_number_range['value_max'] >
		,
		ReturnType< $yuf_number_range_string['max'] >
	>
	type $yuf_number_range_string__step_yuf_number_range_8 = $mol_type_enforce<
		ReturnType< $yuf_number_range['step'] >
		,
		ReturnType< $yuf_number_range_string['step'] >
	>
	export class $yuf_number_range extends $mol_number {
		type( ): string
		step( ): number
		dec_icon( ): $mol_icon_minus
		inc_icon( ): $mol_icon_plus
		String( ): $yuf_number_range_string
	}
	
}

//# sourceMappingURL=range.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_video_slider extends $yuf_number_range {
		precision( ): number
		value_max( ): number
		value_min( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=slider.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_video_estimate extends $mol_view {
		time_formatted( ): string
		time( ): number
		duration( ): number
		ms_enabled( ): boolean
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=estimate.view.tree.d.ts.map
declare namespace $ {

	type $yuf_video_play__checked_yuf_video_bar_1 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['playing'] >
		,
		ReturnType< $yuf_video_play['checked'] >
	>
	type $yuf_video_full__checked_yuf_video_bar_2 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['fullscreen'] >
		,
		ReturnType< $yuf_video_full['checked'] >
	>
	type $mol_view__sub_yuf_video_bar_3 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['left_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_video_slider__value_yuf_video_bar_4 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['time'] >
		,
		ReturnType< $yuf_video_slider['value'] >
	>
	type $yuf_video_slider__value_max_yuf_video_bar_5 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['duration'] >
		,
		ReturnType< $yuf_video_slider['value_max'] >
	>
	type $mol_view__sub_yuf_video_bar_6 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['mid_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $yuf_video_estimate__time_yuf_video_bar_7 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['time'] >
		,
		ReturnType< $yuf_video_estimate['time'] >
	>
	type $yuf_video_estimate__duration_yuf_video_bar_8 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['duration'] >
		,
		ReturnType< $yuf_video_estimate['duration'] >
	>
	type $mol_view__sub_yuf_video_bar_9 = $mol_type_enforce<
		ReturnType< $yuf_video_bar['right_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $yuf_video_bar extends $mol_view {
		playing( next?: boolean ): boolean
		Playing( ): $yuf_video_play
		fullscreen( next?: boolean ): boolean
		Fullscreen( ): $yuf_video_full
		left_content( ): readonly($mol_view)[]
		Left( ): $mol_view
		time( next?: number ): number
		duration( ): number
		Slider( ): $yuf_video_slider
		mid_content( ): readonly($mol_view)[]
		Mid( ): $mol_view
		Time( ): $yuf_video_estimate
		right_content( ): readonly($mol_view)[]
		Right( ): $mol_view
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=bar.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_karaoke_bar extends $yuf_video_bar {
		left_content( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=bar.view.tree.d.ts.map
declare namespace $ {

	type $yuf_karaoke_text__uri_yuf_karaoke_player_1 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_player['lyrics_url'] >
		,
		ReturnType< $yuf_karaoke_text['uri'] >
	>
	type $yuf_karaoke_text__time_yuf_karaoke_player_2 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_player['video_time'] >
		,
		ReturnType< $yuf_karaoke_text['time'] >
	>
	type __yuf_karaoke_player_3 = $mol_type_enforce<
		Parameters< $yuf_karaoke_player['video_time'] >[0]
		,
		Parameters< ReturnType< $yuf_karaoke_player['Player'] >['time'] >[0]
	>
	type __yuf_karaoke_player_4 = $mol_type_enforce<
		Parameters< $yuf_karaoke_player['playing'] >[0]
		,
		Parameters< ReturnType< $yuf_karaoke_player['Player'] >['playing'] >[0]
	>
	type $mol_video_player__uri_yuf_karaoke_player_5 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_player['uri'] >
		,
		ReturnType< $mol_video_player['uri'] >
	>
	type $mol_video_player__controls_yuf_karaoke_player_6 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_video_player['controls'] >
	>
	type $mol_video_player__autoplay_yuf_karaoke_player_7 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_video_player['autoplay'] >
	>
	type $mol_video_player__loop_yuf_karaoke_player_8 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_video_player['loop'] >
	>
	type $mol_video_player__uri_yuf_karaoke_player_9 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_player['uri'] >
		,
		ReturnType< $mol_video_player['uri'] >
	>
	type $yuf_karaoke_bar__playing_yuf_karaoke_player_10 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_player['playing'] >
		,
		ReturnType< $yuf_karaoke_bar['playing'] >
	>
	type $yuf_karaoke_bar__fullscreen_yuf_karaoke_player_11 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_player['fullscreen'] >
		,
		ReturnType< $yuf_karaoke_bar['fullscreen'] >
	>
	type $yuf_karaoke_bar__duration_yuf_karaoke_player_12 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_player['video_duration'] >
		,
		ReturnType< $yuf_karaoke_bar['duration'] >
	>
	type $yuf_karaoke_bar__time_yuf_karaoke_player_13 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_player['video_time'] >
		,
		ReturnType< $yuf_karaoke_bar['time'] >
	>
	export class $yuf_karaoke_player extends $mol_view {
		title( ): ReturnType< ReturnType< $yuf_karaoke_player['model'] >['title'] >
		uri( ): ReturnType< ReturnType< $yuf_karaoke_player['model'] >['audio_url'] >
		lyrics_url( ): ReturnType< ReturnType< $yuf_karaoke_player['model'] >['lyrics_url'] >
		Track( ): $yuf_karaoke_text
		video_time( next?: ReturnType< ReturnType< $yuf_karaoke_player['Player'] >['time'] > ): ReturnType< ReturnType< $yuf_karaoke_player['Player'] >['time'] >
		video_duration( ): ReturnType< ReturnType< $yuf_karaoke_player['Player'] >['duration'] >
		playing( next?: ReturnType< ReturnType< $yuf_karaoke_player['Player'] >['playing'] > ): ReturnType< ReturnType< $yuf_karaoke_player['Player'] >['playing'] >
		Player( ): $mol_video_player
		fullscreen( next?: boolean ): boolean
		Bar( ): $yuf_karaoke_bar
		bar_content( ): readonly($mol_view)[]
		model( ): $yuf_karaoke_model
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=player.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_icon__Icon_yuf_karaoke_page_1 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_page['Edit_check_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked_yuf_karaoke_page_2 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_page['edit_enabled'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type __yuf_karaoke_page_3 = $mol_type_enforce<
		Parameters< $yuf_karaoke_page['value_str'] >[0]
		,
		Parameters< ReturnType< $yuf_karaoke_page['Form'] >['value_str'] >[0]
	>
	type __yuf_karaoke_page_4 = $mol_type_enforce<
		Parameters< $yuf_karaoke_page['value_str'] >[1]
		,
		Parameters< ReturnType< $yuf_karaoke_page['Form'] >['value_str'] >[1]
	>
	type $yuf_karaoke_form__model_yuf_karaoke_page_5 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_page['model'] >
		,
		ReturnType< $yuf_karaoke_form['model'] >
	>
	type $yuf_karaoke_form__foot_yuf_karaoke_page_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_karaoke_form['foot'] >
	>
	type $yuf_karaoke_form__done_yuf_karaoke_page_7 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_page['done'] >
		,
		ReturnType< $yuf_karaoke_form['done'] >
	>
	type $yuf_karaoke_player__model_yuf_karaoke_page_8 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_page['model'] >
		,
		ReturnType< $yuf_karaoke_player['model'] >
	>
	type $yuf_karaoke_player__bar_content_yuf_karaoke_page_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $yuf_karaoke_player['bar_content'] >
	>
	export class $yuf_karaoke_page extends $mol_page {
		title( ): ReturnType< ReturnType< $yuf_karaoke_page['model'] >['title'] >
		audio_url( ): ReturnType< ReturnType< $yuf_karaoke_page['model'] >['audio_url'] >
		buttons_content( ): ReturnType< $yuf_karaoke_page['buttons'] >
		Edit_check_icon( ): $mol_icon_edit
		edit_enabled( next?: boolean ): boolean
		Edit_check( ): $mol_check_icon
		Close( ): any
		value_str( id: any, next?: ReturnType< ReturnType< $yuf_karaoke_page['Form'] >['value_str'] > ): ReturnType< ReturnType< $yuf_karaoke_page['Form'] >['value_str'] >
		done( next?: any ): any
		buttons( ): ReturnType< ReturnType< $yuf_karaoke_page['Form'] >['buttons'] >
		Form( ): $yuf_karaoke_form
		edit_form_content( ): readonly($mol_view)[]
		Player_bar( ): ReturnType< ReturnType< $yuf_karaoke_page['Player'] >['Bar'] >
		Player( ): $yuf_karaoke_player
		sing_content( ): readonly($mol_view)[]
		model( ): $yuf_karaoke_model
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
		foot( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $ {

	type $mol_dimmer__haystack_yuf_karaoke_link_1 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_link['title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_yuf_karaoke_link_2 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_link['needle'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	export class $yuf_karaoke_link extends $yuf_link {
		title( ): ReturnType< ReturnType< $yuf_karaoke_link['model'] >['title'] >
		needle( ): string
		Title( ): $mol_dimmer
		model( ): $yuf_karaoke_model
		content( ): readonly($mol_view_content)[]
	}
	
}

//# sourceMappingURL=link.view.tree.d.ts.map
declare namespace $ {

	type __yuf_karaoke_catalog_1 = $mol_type_enforce<
		Parameters< $yuf_karaoke_catalog['by_id'] >[0]
		,
		Parameters< ReturnType< $yuf_karaoke_catalog['store'] >['by_id'] >[0]
	>
	type $yuf_karaoke_page__model_yuf_karaoke_catalog_2 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_catalog['by_id'] >
		,
		ReturnType< $yuf_karaoke_page['model'] >
	>
	type $yuf_karaoke_page__done_yuf_karaoke_catalog_3 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_catalog['done'] >
		,
		ReturnType< $yuf_karaoke_page['done'] >
	>
	type $yuf_karaoke_page__Close_yuf_karaoke_catalog_4 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_catalog['Spread_close'] >
		,
		ReturnType< $yuf_karaoke_page['Close'] >
	>
	type $yuf_karaoke_link__model_yuf_karaoke_catalog_5 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_catalog['by_id'] >
		,
		ReturnType< $yuf_karaoke_link['model'] >
	>
	type $yuf_karaoke_link__needle_yuf_karaoke_catalog_6 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_catalog['menu_filter'] >
		,
		ReturnType< $yuf_karaoke_link['needle'] >
	>
	type $yuf_karaoke_link__link_arg_yuf_karaoke_catalog_7 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_catalog['arg'] >
		,
		ReturnType< $yuf_karaoke_link['link_arg'] >
	>
	export class $yuf_karaoke_catalog extends $yuf_catalog {
		spread_ids( ): ReturnType< ReturnType< $yuf_karaoke_catalog['store'] >['ids'] >
		by_id( id: any): ReturnType< ReturnType< $yuf_karaoke_catalog['store'] >['by_id'] >
		done( id: any, next?: any ): any
		param_suffix( ): string
		menu_title( ): string
		store( ): $yuf_karaoke_store
		Spread( id: any): $yuf_karaoke_page
		Menu_link( id: any): $yuf_karaoke_link
	}
	
}

//# sourceMappingURL=catalog.view.tree.d.ts.map
declare namespace $ {

	type $yuf_ws_status__ws_yuf_karaoke_app_1 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_app['ws'] >
		,
		ReturnType< $yuf_ws_status['ws'] >
	>
	type $yuf_karaoke_catalog__store_yuf_karaoke_app_2 = $mol_type_enforce<
		ReturnType< $yuf_karaoke_app['store'] >
		,
		ReturnType< $yuf_karaoke_catalog['store'] >
	>
	export class $yuf_karaoke_app extends $yuf_catalog_app {
		ws( ): $yuf_ws_statefull
		Ws_status( ): $yuf_ws_status
		store( ): $yuf_karaoke_store
		Catalog( ): $yuf_karaoke_catalog
		logged( next?: boolean ): boolean
		menu_links_authorized( ): ReturnType< $yuf_karaoke_app['menu_links'] >
		foot_second_post( ): readonly(any)[]
		param( ): string
		spreads( ): ({ 
			'catalog': ReturnType< $yuf_karaoke_app['Catalog'] >,
		}) 
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
declare namespace $ {

	export class $yuf_karaoke_demo extends $mol_example_large {
		Karaoke( ): $yuf_karaoke_app
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__style_yuf_list_slicer_1 = $mol_type_enforce<
		({ 
			'flex-basis': ReturnType< $yuf_list_slicer['placeholder_width'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $yuf_list_slicer_row__sub_yuf_list_slicer_2 = $mol_type_enforce<
		ReturnType< $yuf_list_slicer['row_items'] >
		,
		ReturnType< $yuf_list_slicer_row['sub'] >
	>
	export class $yuf_list_slicer extends $mol_list {
		card_minimal_width( ): number
		card_minimal_height( ): number
		placeholder_width( id: any): string
		row_items( id: any): readonly($mol_view)[]
		items( ): readonly($mol_view)[]
		items_per_row( next?: number ): number
		item_width_min( id: any): ReturnType< $yuf_list_slicer['card_minimal_width'] >
		item_height_min( id: any): ReturnType< $yuf_list_slicer['card_minimal_height'] >
		Placeholder( id: any): $mol_view
		Row( id: any): $yuf_list_slicer_row
	}
	
	export class $yuf_list_slicer_row extends $mol_view {
	}
	
}

//# sourceMappingURL=slicer.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_yuf_list_slicer_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_number__value_yuf_list_slicer_demo_2 = $mol_type_enforce<
		ReturnType< $yuf_list_slicer_demo['items_count'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_yuf_list_slicer_demo_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max_yuf_list_slicer_demo_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $yuf_list_slicer_demo_item__title_yuf_list_slicer_demo_5 = $mol_type_enforce<
		ReturnType< $yuf_list_slicer_demo['item_title'] >
		,
		ReturnType< $yuf_list_slicer_demo_item['title'] >
	>
	type $yuf_list_slicer__items_yuf_list_slicer_demo_6 = $mol_type_enforce<
		ReturnType< $yuf_list_slicer_demo['list_items'] >
		,
		ReturnType< $yuf_list_slicer['items'] >
	>
	type $mol_page__tools_yuf_list_slicer_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_yuf_list_slicer_demo_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	export class $yuf_list_slicer_demo extends $mol_example_large {
		count( ): string
		Items_text( ): $mol_view
		items_count( next?: number ): number
		Items_count( ): $mol_number
		item_title( id: any): string
		Item( id: any): $yuf_list_slicer_demo_item
		list_items( ): readonly(any)[]
		Items( ): $yuf_list_slicer
		Page( ): $mol_page
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
	type $mol_link__title_yuf_list_slicer_demo_item_1 = $mol_type_enforce<
		ReturnType< $yuf_list_slicer_demo_item['title'] >
		,
		ReturnType< $mol_link['title'] >
	>
	export class $yuf_list_slicer_demo_item extends $mol_view {
		Link( ): $mol_link
		minimal_width( ): number
		minimal_height( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
export = $;
//# sourceMappingURL=web.d.ts.map
