import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import drag from '@dojo/framework/core/middleware/drag';
import * as css from './SplitPane.m.css';
import { RenderResult } from '@dojo/framework/core/interfaces';

export interface SplitPaneProperties {
	reverse?: boolean;
	initialWidth?: number;
}

export interface SplitPaneChildren {
	leading: RenderResult;
	trailing: RenderResult;
}

const factory = create({ icache, theme, drag }).children<SplitPaneChildren>().properties<SplitPaneProperties>();
export default factory(function SplitPane({ middleware: { icache, theme, drag }, children, properties }) {

	const [{ leading, trailing }] = children();
	const { reverse, initialWidth = 300 } = properties();

	const thumbDrag = drag.get('thumb');
	let width = icache.getOrSet('width', initialWidth);

	if (thumbDrag.isDragging) {
		width = icache.set('width', width + thumbDrag.delta.x);
	}

	return (
		<div key='root' classes={[css.root, theme.variant(), reverse && css.reverse]}>
			<div classes={css.leading} styles={{ width: `${width}px`}}>{ leading }</div>
			<div classes={css.divider}>
				<div classes={css.thumb} key='thumb'></div>
			</div>
			<div classes={css.trailing}>{ trailing }</div>
		</div>
	);
});
