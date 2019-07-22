<template>
  <div class="main">
      dewdwefewwfwfw
    <img v-if="lazy" @loadstart="show = true" @load="show = false" v-lazy="getSrc" :key="getSrc" class="img"/>
    <img v-if="!lazy" @loadstart="show = true" @load="show = false" :src="getSrc" class="img"/>
  </div>
</template>

<script>
import {containsString} from '@/js/util';
import setting from '../../config/setting';
export default {
  data () {
    return {
      show: true,
      url: {
        src: ''
      }
    }
  },
  computed: {
    getSrc () {
        console.log(this.src);
      let src = this.src;
      if (!src) {
        return {
          src: ''
        };
      }
      if (!containsString(src, 'http://')) {
        src = setting.oss_http + src;
      }
      if (this.copy) {
        if (containsString(src, '?')) {
          src = src + '&copy';
        } else {
          src = src + '?copy';
        }
      }
      // fill、pad、fixed
      if (this.size) {
        let p = 'x-oss-process=image/resize,m_fill';
        let size = this.size + '';
        if (containsString(size, ',')) {
          let arr = size.split(',');
          if (parseInt(arr[0]) > 0) {
            p = p + ',w_' + arr[0];
          }
          if (parseInt(arr[1]) > 0) {
            p = p + ',h_' + arr[1];
          }
        } else {
          p = p + ',w_' + size + ',h_' + size;
        }
        if (containsString(src, '?')) {
          src = src + '&' + p;
        } else {
          src = src + '?' + p;
        }
      }
      console.log(src);
      return src;
    }
  },
  props: ['src', 'copy', 'lazy', 'size']
}
</script>

<style scoped>
  .main {
    overflow: hidden;
    display: inline-block;
  }
  .baseimg, .img {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .baseimg {
    background-color: #dedede;
    line-height: 1;
    position: absolute;
    left: 0;
    top: 0;
    color: #999999;
    font-size: .24rem;
  }
</style>
