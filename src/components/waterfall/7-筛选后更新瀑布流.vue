<template>
  <div class="container-water-fall">
    <div class="filter-menu">
      <input
        type="text"
        v-model="filterTags"
        placeholder="输入标签筛选"
        @input="filterImages"
      />
    </div>
    <waterfall :key="waterfallKey" :col="col" :data="data" @loadmore="loadmore" :gutterWidth="10">
      <div
        class="cell-item"
        v-for="(item, index) in data"
        :key="index"
        @click="showImageDetails(index)"
      >
        <img
          :src="item.imageUrlThumbnail || item.imageUrl"
          alt="item.folderName"
        />
        <div class="item-body">
          <div class="item-desc">{{ item.annotation }}</div>
          <div class="item-footer">
            <div
              v-if="item.avatar"
              class="avatar"
              :style="{ backgroundImage: `url(${item.avatar})` }"
            ></div>
            <div class="name">{{ item.tags }}</div>
          </div>
        </div>
      </div>
    </waterfall>
    <detail
      v-if="selectedImage"
      :selectedImage="selectedImage"
      @CloseImageDetails="CloseImageDetails"
    />
    <loading :show="isLoading" />
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import loading from "./loading.vue";
import detail from "./图片详情.vue";
import axios from "axios";

const data = ref([]);
const col = ref(5);
const isLoading = ref(false);
const originData = ref([]);
const selectedImage = ref(null);
const filterTags = ref('');
const waterfallKey = ref(0);

onMounted(() => {
  fetchImagesInfo();
});

// 获取eagle分组中的图片信息
async function fetchImagesInfo() {
  try {
    const response = await axios.get(
      "https://uiweb.oss-cn-chengdu.aliyuncs.com/images/imagesInfo.json"
    );
    originData.value = response.data;
    data.value = originData.value;
    console.log("originData", data.value);
  } catch (error) {
    console.error("Error fetching images info:", error);
  }
}

const itemWidth = computed(
  () => 133 * 0.5 * (document.documentElement.clientWidth / 375)
);
const gutterWidth = computed(
  () => 10 * 0.5 * (document.documentElement.clientWidth / 375)
);

// 点击图片显示详情
const showImageDetails = (index) => {
  const item = data.value[index];
  selectedImage.value = item;
  document.body.style.overflow = "hidden";
};

// 关闭图片详情
const CloseImageDetails = () => {
  selectedImage.value = null;
  document.body.style.overflow = "";
};

// 筛选图片
const filterImages = () => {
  const tags = filterTags.value.toLowerCase().split(' ');
  data.value = originData.value.filter((item) =>
    tags.every(tag => item.tags.join(' ').toLowerCase().includes(tag))
  );
  waterfallKey.value += 1;
};

const loadmore = () => {
  isLoading.value = true;
  setTimeout(() => {
    data.value = Array.from(data.value.concat(originData.value));
    isLoading.value = false;
  }, 0);
};
</script>

<style lang="less" scoped>
.container-water-fall {
  width: 100vw;
  box-sizing: border-box;

  .filter-menu {
    margin-bottom: 10px;
    input {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

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
