<template>
  <section>
    <header>
      <div>경기도 남양주시 순화궁로</div>
      <div>
        <button>C</button>
      </div>
    </header>
  </section>
</template>

<style></style>

<script>
const DATA_COUNT = 10;
const MOCK_DATA = [];
for (let i; i <= DATA_COUNT; i++) {
  MOCK_DATA.push({
    id: i,
    name: "가게이름",
    imagePath: "",
    rate: 5,
    category: "한식",
    distance: 3.5,
  });
}

export default {
  name: "home",
};
</script>
