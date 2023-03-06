<template>
  <div class="page-wrapper lineup-wrapper">
    <Modal
      v-model:visible="isModalVisible"
      title="리뷰 생성"
      @cancel="cancelRegister"
      :footer="null"
    >
      <a-form
        :model="formState"
        name="validate_other"
        @finishFailed="onFinishFailed"
        @finish="onFinish"
      >
        <a-form-item label="방문매장">
          {{ reviewTarget.name }}
        </a-form-item>
        <a-form-item label="방문일시">
          {{ reviewTarget.arrivedAt }}
        </a-form-item>
        <a-form-item
          label="리뷰작성"
          :rules="[{ required: true, message: '리뷰를 입력해주세요.' }]"
        >
          <a-textarea v-model:value="formState.content" auto-size />
        </a-form-item>
        <a-form-item
          label="별점"
          :rules="[{ required: true, message: '점수를 매겨주세요' }]"
        >
          <a-rate v-model:value="formState.rate" />
        </a-form-item>
        <a-form-item name="upload" label="사진첨부">
          <a-upload
            v-model:fileList="formState.upload"
            name="logo"
            list-type="picture"
            accept=".png, .jpg, .jpeg"
          >
            <a-button>
              <template #icon><UploadOutlined /></template>
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item style="text-align: right">
          <a-button type="primary" html-type="submit">제출</a-button>
        </a-form-item>
      </a-form>
    </Modal>
    <section class="nav-wrapper">
      <BackwardButton @click="moveBackward" message="나의 줄서기 내역" />
    </section>
    <ul class="lineup-list">
      <li v-for="data in datas" class="lineup" @click="handleReviewModal(data)">
        <h1>{{ data.restaurantName }}</h1>
        <p>{{ data.numOfMembers }}명</p>
        <p class="time-string">
          <strong>줄서기 시작 시간 :</strong>
          {{
            dateFormatter(
              new Date(data.startedAt),
              "yyyy년 MM월 dd일 eee요일, h시 m분"
            )
          }}
        </p>
        <p class="time-string">
          <strong>줄서기 종료 시간 :</strong>
          {{
            data.arrivedAt
              ? dateFormatter(
                  new Date(data.arrivedAt),
                  "yyyy년 MM월 dd일 eee요일, h시 m분"
                )
              : "-"
          }}
        </p>
        <div class="badge-wrapper">
          <p
            v-if="data.reviewed && data.status === 'ARRIVE'"
            class="badge review-badge complete"
          >
            리뷰 완료
          </p>
          <p
            v-else-if="!data.reviewed && data.status === 'ARRIVE'"
            class="badge review-badge required"
          >
            리뷰 가능
          </p>
          <p class="badge status-badge">{{ status[data.status] }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import BackwardButton from "../components/BackwardButton.vue";
import { dateFormatter } from "@/utils/date.js";
import Modal from "ant-design-vue/lib/modal";
import { UploadOutlined } from "@ant-design/icons-vue";
import { mapGetters } from "vuex";
import { api } from "../utils/apis";

const MOCK_DATA = [];
const DATA_COUNT = 0;
for (let i = 1; i <= DATA_COUNT; i++) {
  MOCK_DATA.push({
    restaurantId: i,
    restaurantName: "레스토랑 이름",
    numOfMembers: i,
    status:
      i % 4 == 0
        ? "WAIT"
        : i % 4 === 1
        ? "ARRIVE"
        : i % 4 === 2
        ? "CANCEL"
        : "CALL",
    reviewed: i % 2 == 0 ? true : false,
    startedAt: new Date(),
    arrivedAt: new Date(),
  });
}

export default {
  name: "MyLineupList",
  components: { BackwardButton, UploadOutlined, Modal },
  props: {
    isBottom: false,
  },
  methods: {
    dateFormatter,
    moveBackward() {
      this.$router.push("/info");
    },
    handleReviewModal({
      restaurantId: id,
      restaurantName: name,
      status,
      reviewed,
      arrivedAt,
      type,
      id: lineupId,
    }) {
      if (status != "ARRIVE") {
        Modal.error({
          title: "리뷰 불가",
          content: "입장완료한 줄서기 내역에만 리뷰를 추가할 수 있습니다.",
          //   appContext,
        });
        return;
      }

      if (reviewed) {
        Modal.error({
          title: "리뷰 불가",
          content: "이미 리뷰를 완료한 줄서기 내역입니다.",
        });
        return;
      }
      this.reviewTarget = {
        id,
        name,
        arrivedAt: this.dateFormatter(
          new Date(arrivedAt),
          "yyyy년 MM월 dd일 eee요일, h시 m분"
        ),
        lineupId,
        type,
      };
      this.isModalVisible = true;
    },
    async onFinish() {
      if (!this.formState.content) {
        Modal.error({
          title: "필수 사항 체크",
          content: "리뷰는 반드시 작성해야합니다.",
        });
        return;
      }
      const imageList = this.formState.upload.map((cur) => cur.originFileObj);

      const payload = {
        type: this.reviewTarget.type,
        lineupId: this.reviewTarget.lineupId,
        rate: this.formState.rate,
        content: this.formState.content,
        images: imageList,
      };

      console.log(this.reviewTarget);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return this.$router.replace("/login");
      }
      api.default.setHeadersAuthorization(token);
      const form = new FormData();
      if (payload.images.length) {
        for (let image of payload.images) {
          form.append("images", image);
        }
      }
      delete payload.images;
      const json = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      form.append("controllerRequest", json);
      try {
        await api.postReview(this.reviewTarget.id, form);
        Modal.success({
          title: "업데이트 성공",
          content: "리뷰를 성공적으로 업데이트 했습니다.",
        });
        this.resetValue();
        this.syncData();
        this.isModalVisible = false;
      } catch (e) {
        Modal.error({
          title: "업데이트 실패",
          content: "리뷰 업데이트에 실패했습니다. 다시시도해주세요.",
        });
      }
    },
    onFinishFailed() {
      Modal.error({
        title: "등록 실패",
        content: "리뷰 등록에 실패하였습니다. 새로고침 후 다시 등록해주세요.",
        // appContext,
      });
    },
    cancelRegister() {
      this.resetValue();
    },
    resetValue() {
      this.formState = {
        upload: [],
        content: "",
      };
      this.reviewTarget = {
        id: 0,
        name: "",
        arrivedAt: "",
        lineupId: 0,
        type: "",
      };
    },
    async syncData(id) {
      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        Modal.warn({
          title: "로그인 요청",
          content: "로그인 이후 이용가능합니다.",
        });
        this.$router.replace("/info");
        return;
      }
      api.default.setHeadersAuthorization(token);
      const payload = {
        size: 10,
        lastId: id,
      };
      await this.$store.dispatch("syncUserWaitingHistories", payload);
      this.datas = this.userWaitingHistories.sort(
        (a, b) => b.lineupId - a.lineupId
      );
    },
  },
  computed: {
    ...mapGetters({
      userWaitingHistories: "getUserWaitingHistories",
      hasRemainData: "getHasRemainWaitingHistories",
    }),
  },
  async created() {
    this.$store.dispatch("initWaitings");
    this.syncData();
  },
  watch: {
    isBottom(value) {
      console.log(value, this.hasRemainData);
      if (value && this.hasRemainData) {
        const lastId = this.datas[this.datas.length - 1].id;
        this.syncData(lastId);
      }
    },
  },
  data() {
    return {
      datas: MOCK_DATA,
      status: {
        WAIT: "대기",
        ARRIVE: "입장",
        CANCEL: "취소",
        CALL: "호출",
      },
      isModalVisible: false,
      formState: {
        upload: [],
        content: "",
        rate: 0,
      },
      reviewTarget: {
        id: 0,
        name: "",
        arrivedAt: "",
      },
    };
  },
};
</script>
<style lang="scss">
.ant-upload-list-picture .ant-upload-list-item-error,
.ant-upload-list-picture-card .ant-upload-list-item-error {
  border-color: rgb(109, 158, 54);
  color: rgb(109, 158, 54);
}

.ant-upload-list-item-error .ant-upload-list-item-card-actions .anticon,
.ant-upload-list-item-error,
.ant-upload-list-item-error .ant-upload-text-icon > .anticon,
.ant-upload-list-item-error .ant-upload-list-item-name {
  color: rgb(109, 158, 54);
}
.nav-wrapper {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 999;
}
.lineup-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  &,
  * {
    margin: 0;
  }
  li {
    border: 0.5px solid #dadce0;
    border-radius: 10px;
    padding: 15px;
    overflow: hidden;
    box-shadow: 1px 1px 3px 1px #dadce0;
    position: relative;

    .time-string {
      font-size: 12px;
      letter-spacing: -0.5px;
    }

    .badge-wrapper {
      position: absolute;
      display: flex;
      top: 15px;
      right: 15px;
      gap: 5px;
      .badge {
        padding: 5px 10px;
        border: 0.5px solid #dadce0;
        border-radius: 999px;
        background-color: #dadce0;
        &.review-badge.required {
          border: 0.5px solid rgb(109, 158, 54);
          background-color: rgb(109, 158, 54);
          color: #fff;
        }
        &.review-badge.complete {
          border: 0.5px solid rgb(211, 63, 68);
          background-color: rgb(211, 63, 68);
          color: #fff;
        }
      }
    }
  }
  .login-form-button {
    text-align: center;
    width: 200px;
    height: 50px;
  }
}
</style>
