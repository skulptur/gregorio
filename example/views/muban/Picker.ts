import {
  defineComponent,
  refComponents,
  bindMap,
  computed,
} from '@muban/muban';
import { useGregorio } from './useGregorio';
import { Page } from './Page';

export const Picker = defineComponent({
  name: 'picker',
  refs: {
    page: refComponents(Page),
  },
  setup({ refs }) {
    const pageId = 0;
    // TODO: this needs to be created on a parent component and passed down as props
    const gregorio = useGregorio();

    return [
      ...bindMap(refs.page, (_ref, index) => {
        return {
          getPage: () => {
            return gregorio.value.pages[index];
          },
        };
      }),
    ];
  },
});
