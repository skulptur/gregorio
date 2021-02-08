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
    return [
      // bind(refs.title, {
      //   text: computed(() => (props.page as any)?.title),
      // }),
      bind(refs.previousButton, {
        click: () => {
          props.onPrevious && props.onPrevious();
        },
      }),
      bind(refs.nextButton, {
        click: () => {
          console.log('next buton');
          props.onNext && props.onNext();
        },
      }),
      // ...bindMap(refs.weekDayLabel, (_ref, index) => {
      //   return {
      //     text: computed(() => (props.page as any)?.weekLabels[index]),
      //   };
      // }),
      ...bindMap(refs.day, (_ref, index) => {
        return {
          // text: computed(() => (props.page as any)?.days[index].formattedText),
          css: computed(() => {
            console.log(props.page);
            if (!props.page) return {};
            const cssBinding = getDayClassNames(
              (props.page as any)?.days[index]
            );
            console.log(cssBinding);
            return cssBinding;
          }),
          click: () => {
            (props.page as any)?.days[index].select();
          },
          mouseover: () => {
            (props.page as any)?.days[index].hover();
          },
        };
      }),
    ];
  },
});
