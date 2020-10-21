<template>
  <div
    class="layout"
    :style="layoutStyle"
    :class="layoutIsLocked && 'layout_locked'"
  >
    <LayoutWrapper>
      <LayoutHeader />
      <LayoutStatus />
      <LayoutContent>
        <slot />
      </LayoutContent>
    </LayoutWrapper>
    <LayoutFooter />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { VIEWPORT } from '~/store/types';
  import { setScrollTop } from '~/helpers/viewport';

  import LayoutWrapper from './LayoutWrapper';
  import LayoutHeader from './LayoutHeader';
  import LayoutStatus from './LayoutStatus';
  import LayoutContent from './LayoutContent';
  import LayoutFooter from './LayoutFooter';

  export default {
    name: 'Layout',
    components: {
      LayoutWrapper,
      LayoutHeader,
      LayoutStatus,
      LayoutContent,
      LayoutFooter,
    },
    data() {
      return {
        pageScrollPosition: 0,
      };
    },
    computed: {
      ...mapGetters('viewport', {
        scrollTop: VIEWPORT.GET_SCROLL_TOP,
        layoutIsLocked: VIEWPORT.GET_IS_LOCKED,
      }),
      layoutStyle() {
        const { layoutIsLocked, pageScrollPosition } = this;
        const top = `${pageScrollPosition / -1}px`;
        const minHeight = `calc(100vh + ${pageScrollPosition}px)`;
        return layoutIsLocked ? { top, minHeight } : {};
      },
    },
    watch: {
      layoutIsLocked() {
        this.setPageScroll();
      },
    },
    methods: {
      setPageScroll() {
        const { pageScrollPosition, layoutIsLocked, scrollTop } = this;
        const scrollPosition = layoutIsLocked ? 0 : pageScrollPosition;
        if (layoutIsLocked) {
          this.pageScrollPosition = scrollTop;
        }
        this.$nextTick(() => {
          setScrollTop(scrollPosition);
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    z-index: 0;
  }
  .layout_locked {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    pointer-events: none;
  }
</style>
