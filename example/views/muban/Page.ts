import {
  defineComponent,
  refElement,
  bind,
  computed,
  bindMap,
  refCollection,
  propType,
} from '@muban/muban';
import { getDayClassNames } from '../utils/getDayClassNames';

export const Page = defineComponent({
  name: 'page',
  refs: {
    title: 'title',
    weekDayLabel: refCollection('weekDayLabel'),
    day: refCollection('day'),
    previousButton: refElement('previousButton'),
    nextButton: 'nextButton',
  },
  props: {
    onNext: propType.func.optional,
    onPrevious: propType.func.optional,
    page: { type: Object, isOptional: true },
  },
  setup({ props, refs }) {
    // TODO: this needs to be created on a parent component and passed down as props

    return [
      bind(refs.title, {
        text: computed(() => (props.page as any)?.title),
      }),
      bind(refs.previousButton, {
        click: () => {
          props.onPrevious && props.onPrevious();
        },
      }),
      bind(refs.nextButton, {
        click: () => {
          props.onNext && props.onNext();
        },
      }),
      ...bindMap(refs.weekDayLabel, (_ref, index) => {
        return {
          text: computed(() => (props.page as any)?.weekLabels[index]),
        };
      }),
      ...bindMap(refs.day, (_ref, index) => {
        return {
          text: computed(() => (props.page as any)?.days[index].formattedText),
          css: computed(() => {
            if (!props.page) return {};

            return getDayClassNames((props.page as any)?.days[index]);
          }),
          onClick: () => (props.page as any)?.days[index].select(),
          onMouseOver: () => (props.page as any)?.days[index].hover(),
        };
      }),
    ];
  },
});
