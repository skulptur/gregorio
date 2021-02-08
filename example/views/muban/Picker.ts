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
    const gregorio = useGregorio();

    return [
      ...bindMap(refs.page, (_ref, index) => {
        return {
          onNext: () => gregorio.value.nextMonth(),
          onPrevious: () => gregorio.value.previousMonth(),
          page: computed(() => {
            return gregorio.value.pages[index];
          }),
        };
      }),
    ];
  },
});
