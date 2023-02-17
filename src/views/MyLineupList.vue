<template>
  <div class="page-wrapper lineup-wrapper">
    <a-modal
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
          {{ reviewTarget.endedAt }}
        </a-form-item>
        <a-form-item
          label="리뷰작성"
          :rules="[{ required: true, message: '리뷰를 입력해주세요.' }]"
        >
          <a-textarea v-model:value="formState.content" auto-size />
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
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <BackwardButton @click="moveBackward" message="나의 줄서기 내역" />
    <ul class="lineup-list">
      <li v-for="data in datas" class="lineup" @click="handleReviewModal(data)">
        <h1>{{ data.restaurantName }}</h1>
        <p>{{ data.numOfMembers }}명</p>
        <p class="time-string">
          <strong>줄서기 시작 시간 :</strong>
          {{
            dateFormatter(data.startedAt, "yyyy년 MM월 dd일 eee요일, h시 m분")
          }}
        </p>
        <p class="time-string">
          <strong>줄서기 종료 시간 :</strong>
          {{ dateFormatter(data.endedAt, "yyyy년 MM월 dd일 eee요일, h시 m분") }}
        </p>
        <div class="badge-wrapper">
          <p
            v-if="data.isReviewed && data.status === 'APPROVE'"
            class="badge review-badge complete"
          >
            리뷰 완료
          </p>
          <p
            v-else-if="!data.isReviewed && data.status === 'APPROVE'"
            class="badge review-badge required"
          >
            리뷰 필요
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
import { Modal } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

const MOCK_DATA = [];
const DATA_COUNT = 10;
for (let i = 1; i <= DATA_COUNT; i++) {
  MOCK_DATA.push({
    restaurantId: i,
    restaurantName: "레스토랑 이름",
    numOfMembers: i,
    status:
      i % 4 == 0
        ? "WAIT"
        : i % 4 === 1
        ? "APPROVE"
        : i % 4 === 2
        ? "CANCEL"
        : "CALL",
    isReviewed: i % 2 == 0 ? true : false,
    startedAt: new Date(),
    endedAt: new Date(),
  });
}

export default {
  name: "MyLineupList",
  components: { BackwardButton, UploadOutlined },
  methods: {
    dateFormatter,
    moveBackward() {
      this.$router.push("/info");
    },
    handleReviewModal({
      restaurantId: id,
      restaurantName,
      status,
      isReviewed,
      endedAt,
    }) {
      if (status != "APPROVE") {
        Modal.error({
          title: "리뷰 불가",
          content: "입장완료한 줄서기 내역에만 리뷰를 추가할 수 있습니다.",
        });
        return;
      }

      if (isReviewed) {
        Modal.error({
          title: "리뷰 불가",
          content: "이미 리뷰를 완료한 줄서기 내역입니다.",
        });
        return;
      }
      this.reviewTarget = {
        id: id,
        name: restaurantName,
        endedAt: this.dateFormatter(
          endedAt,
          "yyyy년 MM월 dd일 eee요일, h시 m분"
        ),
      };
      this.isModalVisible = true;
    },
    onFinish() {
      console.log(this.formState);
      if (!this.formState.content) {
        Modal.error({
          title: "필수 사항 체크",
          content: "리뷰는 반드시 작성해야합니다.",
        });
        return;
      }
      const imageList = this.formState.upload.map((cur) => cur.originFileObj);
      console.log(imageList);
      this.resetValue();
      this.isModalVisible = false;
    },
    onFinishFailed() {
      Modal.error({
        title: "등록 실패",
        content: "리뷰 등록에 실패하였습니다. 새로고침 후 다시 등록해주세요.",
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
        endedAt: "",
      };
    },
  },
  data() {
    return {
      datas: MOCK_DATA,
      status: {
        WAIT: "대기",
        APPROVE: "입장",
        CANCEL: "취소",
        CALL: "호출",
      },
      isModalVisible: false,
      formState: {
        upload: [],
        content: "",
      },
      reviewTarget: {
        id: 0,
        name: "",
        endedAt: "",
      },
    };
  },
};
</script>
<style lang="scss">
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
        &.review-badge.complete {
          border: 0.5px solid rgb(109, 158, 54);
          background-color: rgb(109, 158, 54);
          color: #fff;
        }
        &.review-badge.required {
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
