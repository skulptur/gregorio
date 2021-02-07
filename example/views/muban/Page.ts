import {
  defineComponent,
  refElement,
  bind,
  computed,
  bindMap,
  ref,
  refCollection,
  propType,
} from '@muban/muban';
import { getDayClassNames } from '../utils/getDayClassNames';
import { useGregorio } from './useGregorio';

export const Page = defineComponent({
  name: 'page',
  refs: {
    title: 'title',
    weekDayLabel: refCollection('weekDayLabel'),
    day: refCollection('day'), // refElement, refCollection, refComponent, refComponents?! refCollection is a weird name
    previousButton: refElement('previousButton'),
    nextButton: 'nextButton',
  },
  props: {
    getPage: propType.func.optional,
  },
  setup({ props, refs }) {
    const pageId = 0;
    // TODO: this needs to be created on a parent component and passed down as props
    const gregorio = useGregorio();
    console.log('props.getPage', props.getPage && props.getPage());

    return [
      bind(refs.title, {
        text: computed(() => gregorio.value.pages[pageId].title),
      }),
      bind(refs.previousButton, {
        click: () => {
          gregorio.value.previousMonth();
        },
      }),
      bind(refs.nextButton, {
        click: () => {
          gregorio.value.nextMonth();
        },
      }),
      ...bindMap(refs.weekDayLabel, (_ref, index) => {
        return {
          text: gregorio.value.pages[pageId].weekLabels[index],
        };
      }),
      ...bindMap(refs.day, (_ref, index) => {
        return {
          text: computed(
            () => gregorio.value.pages[pageId].days[index].formattedText
          ),
          css: {
            // TODO: fix
            [getDayClassNames(gregorio.value.pages[pageId].days[index])]: ref(
              true
            ),
          },
          onClick: () => gregorio.value.pages[pageId].days[index].select(),
          onMouseOver: () => gregorio.value.pages[pageId].days[index].hover(),
        };
      }),
    ];
  },
});
