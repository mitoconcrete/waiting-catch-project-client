<template>
  <section class="modal-wrapper">
    <BackwordButton @click="moveBackward" :message="'지도에서 위치 확인'" />
    <main id="kakao-map" ref="kakao-map"></main>
    <footer v-if="stringAddress">
      <strong>{{ stringAddress }}</strong>
      <a-button type="primary">위치 설정 하기</a-button>
    </footer>
  </section>
</template>
<script>
import BackwordButton from "@/components/BackwardButton.vue";
export default {
  name: "BackwardButton",
  components: {
    BackwordButton,
  },
  data() {
    return {
      stringAddress: "",
      kakao: null,
      map: null,
      marker: null,
      latitude: 0,
      longitude: 0,
    };
  },
  mounted() {
    this.kakao = window.kakao;
    // initial position set
    this.$store.commit("setIsGlobalLoading", true);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;

      this.map = await this.drawMap(latitude, longitude);
      await this.setAdressFromPosition(latitude, longitude);
      this.marker = await this.drawMarker(latitude, longitude);
      this.$store.commit("setIsGlobalLoading", false);

      if (this.map && this.marker) {
        this.kakao.maps.event.addListener(this.map, "click", this.clickMarker);
      }
    });
  },
  methods: {
    drawMap(lat, long) {
      const mapRef = this.$refs["kakao-map"];
      var options = {
        center: new this.kakao.maps.LatLng(lat, long), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      return new this.kakao.maps.Map(mapRef, options); //지도 생성 및 객체 리턴
    },
    setAdressFromPosition(lat, long) {
      const geocoder = new this.kakao.maps.services.Geocoder();

      const coord = new kakao.maps.LatLng(lat, long);
      geocoder.coord2Address(
        coord.getLng(),
        coord.getLat(),
        (result, status) => {
          if (status === this.kakao.maps.services.Status.OK) {
            if (result[0].road_address) {
              this.stringAddress = result[0].road_address.address_name;
            } else {
              this.stringAddress = result[0].address.address_name;
            }
          }
        }
      );
    },
    drawMarker(lat, long) {
      if (this.map) {
        return new this.kakao.maps.Marker({
          map: this.map,
          position: new this.kakao.maps.LatLng(lat, long),
        });
      }
    },
    clickMarker(event) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = event.latLng;
      // 마커 위치를 클릭한 위치로 옮깁니다
      this.marker.setPosition(latlng);

      this.latitude = latlng.getLat();
      this.longitude = latlng.getLng();

      this.setAdressFromPosition(latlng.getLat(), latlng.getLng());
    },
    moveBackward() {
      this.$store.commit("setIsMapModalStatus", false);
    },
  },
};
</script>
<style lang="scss">
.modal-wrapper {
  position: sticky;
  bottom: 0;
  max-width: 480px;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  main {
    #kakao-map {
      width: 100%;
      height: 100%;
    }
  }

  footer {
    padding: 20px;
    strong {
      color: rgb(140, 96, 200);
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 18px;
      display: block;
      text-align: center;
    }
    button {
      width: 100%;
      height: 50px;
      background-color: rgb(140, 96, 200);
      border: 1px solid rgb(140, 96, 200);

      &:focus {
        border: 1px solid rgb(140, 96, 200);
        background-color: rgb(140, 96, 200);
      }

      &:hover {
        border: 1px solid rgb(140, 96, 200, 0.7);
        background-color: rgb(140, 96, 200, 0.7);
      }
    }
  }
}
</style>
