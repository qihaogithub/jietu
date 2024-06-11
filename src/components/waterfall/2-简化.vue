<style lang="less" scoped>
* {
  margin: 0;
}

.container-water-fall {
  width: 100vw;
  box-sizing: border-box;

  .cell-item {
    width: 100%;
    background: #ffffff;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    .item-body {
      padding: 12px;

      .item-desc {
        font-size: 15px;
        color: #333333;
        line-height: 15px;
        font-weight: bold;
      }

      .item-footer {
        margin-top: 22px;
        position: relative;
        display: flex;
        align-items: center;

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 14px;
          color: #999999;
        }

        .like {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;

          &.active .like-total {
            color: #ff4479;
          }

          i {
            width: 28px;
            display: block;
          }

          .like-total {
            margin-left: 10px;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="container-water-fall">
    <waterfall :col="col" :data="data" @loadmore="loadmore" :gutterWidth="10">
      <div class="cell-item" v-for="(item, index) in data" :key="index" @click="() => handleClick(index)">
        <img v-if="item.img" :src="item.img" alt="加载错误" />
        <div class="item-body">
          <div class="item-desc">{{ item.title }}</div>
          <div class="item-footer">
            <div v-if="item.avatar" class="avatar" :style="{ backgroundImage: `url(${item.avatar})` }"></div>
            <div class="name">{{ item.user }}</div>
            <div class="like" :class="item.liked ? 'active' : ''">
              <i></i>
              <div class="like-total">{{ item.like }}</div>
            </div>
          </div>
        </div>
      </div>
    </waterfall>
    <loading :show="isLoading" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import loading from './loading.vue';

const data = ref([]);
const col = ref(5);
const isLoading = ref(false); // 重命名变量以避免冲突
const originData = [
  {
    img: "https://image.watsons.com.cn//upload/8a316140.png?w=377&h=451&x-oss-process=image/resize,w_1080",
    avatar: "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
    title: "最近浴室新宠，日系神仙好物了解一下～",
    user: "1",
    like: "953",
  },
  {
    img: "https://image.watsons.com.cn//upload/083767f0.JPG?w=828&h=620&x-oss-process=image/resize,w_1080",
    avatar: "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
    title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
    user: "2",
    like: "952",
  },
];

const itemWidth = computed(() => 133 * 0.5 * (document.documentElement.clientWidth / 375));
const gutterWidth = computed(() => 10 * 0.5 * (document.documentElement.clientWidth / 375));

const handleClick = (index) => {
  alert(`您点击了第${index + 1}卡片`);
};

const loadmore = () => {
  isLoading.value = true;
  setTimeout(() => {
    data.value = Array.from(data.value.concat(originData));
    isLoading.value = false;
  }, 300);
};

onMounted(() => {
  data.value = originData;
});
</script>
