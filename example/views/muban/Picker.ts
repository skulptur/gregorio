import {
  defineComponent,
  refComponents,
  bindMap,
  computed,
  bindTemplate,
} from '@muban/muban';
import { useGregorio } from './useGregorio';
import { Page } from './Page';
import { renderPickerContent } from './Picker.template';

export const Picker = defineComponent({
  name: 'picker',
  refs: {
    container: 'container',
    page: refComponents(Page),
  },
  setup({ refs }) {
    const gregorio = useGregorio();
    console.log('Picker component', refs.container.element);

    return [
      bindTemplate(
        refs.container,
        computed(() => ({ pages: gregorio.value.pages })),
        renderPickerContent as any,
        { renderImmediate: true }
      ),
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
