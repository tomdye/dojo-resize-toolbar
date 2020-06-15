import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import breakpoint from '@dojo/framework/core/middleware/breakpoint';
import icache from '@dojo/framework/core/middleware/icache';
import { Header } from '@dojo/widgets/header';
import { SlidePane } from '@dojo/widgets/slide-pane';
import { Icon } from '@dojo/widgets/icon';
import * as css from './CollapsingHeader.m.css';

const factory = create({ theme, breakpoint, icache });
export default factory(function CollapsingHeader({ middleware: { theme, breakpoint, icache } }) {

	const size = breakpoint.get('root');
	const open = icache.getOrSet('open', false);
	const collapse = size && (size.breakpoint === 'SM' || size.breakpoint === 'MD');

	const appTitle = 'My App';
	const actions = (
		<virtual>
			<a classes={css.action}>foo</a>
			<a classes={css.action}>bar</a>
			<a classes={css.action}>baz</a>
		</virtual>
	);

	return (
		<div key='root' classes={[css.root, theme.variant()]}>
			<Header>{{
				title: appTitle,
				actions: !collapse && <div classes={css.headerActions}>{ actions }</div>,
				leading: collapse && 
					<button onclick={() => { icache.set('open', !open) }} type='button' classes={css.menuButton}>
						<Icon size='large' type='barsIcon' />
					</button>
			}}</Header>
			{collapse && 
				<SlidePane title={appTitle} open={open} onRequestClose={() => { icache.set('open', false)}}>
					<div classes={css.collapsedActions}>
						{ actions }
					</div>				
				</SlidePane>
			}
		</div>
	);
});
