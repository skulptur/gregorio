import { ref } from '@vue/reactivity';
import { gregorio, Props } from '../../../dist';
import { enUS } from 'date-fns/locale';
import { computed } from '@vue/runtime-core';

export const useGregorio = () => {
  const props = ref<Partial<Props>>({});

  const setProps = (partialProps: Partial<Props>) => {
    props.value = partialProps;
  };

  const gregorioRef = computed(() => {
    console.log('update');
    return gregorio(
      {
        ...props.value,
        isRange: true,
        locale: enUS,
        pageCount: 2,
      },
      setProps
    );
  });

  return gregorioRef;
};
