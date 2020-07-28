<template>
	<div class="box">
		<div class="warp">
			<header>
				<div>
					<input type="checkbox" v-model="allCheckL">
					列表1
				</div>
				<div class="rgt">
					<span v-text="checkedL"></span>
					<span>/</span>
					<span>{{lenL}}</span>
				</div>
			</header>
			<main>
				<ul class="dataItem">
					<li v-for="item in list" :key="item.id">
						<input type="checkbox" v-model="item.checked">
						<!-- <input type="checkbox" @click="changeCheck(item.id)"> -->
						{{item.titel}}
					</li>
				</ul>
			</main>
		</div>
		<button @click="toLeft">
			<</button> <button @click="toRight">>
		</button>
		<div class="warp">
			<header>
				<div>
					<input type="checkbox" v-model="allCheckR">
					列表2
				</div>
				<div class="rgt">
					<span v-text="checkedR"></span>
					<span>/</span>
					<span>{{lenR}}</span>
				</div>
			</header>
			<main>
				<ul class="dataItem">
					<li v-for="item in checkData" :key="item.id">
						<input type="checkbox" v-model="item.checked"> {{item.titel}}
					</li>
				</ul>
			</main>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {
				// 已选择数组
				checkData: [],
			}
		},
		computed: {
			allCheckL: {
				set(val) {
					this.list.forEach((item) => (item.checked = val))
				},
				get() {
					return (
						this.list.length ===
						this.list.filter((item) => item.checked).length
					);
				}
			},
			allCheckR: {
				set(val) {

					this.checkData.forEach((item) => (item.checked = val))
				},
				get() {
					return (
						this.checkData.length ===
						this.checkData.filter((item) => item.checked).length
					);
				}
			},

			// 总计已选
			checkedL() {
				let i = 0;
				this.list.forEach((item) => {
					if (item.checked) i++
				});
				return i;
			},
			checkedR() {
				let i = 0;
				this.checkData.forEach((item) => {
					if (item.checked) i++
				});
				return i;
			},
			// 统计已选
			lenL() {
				return this.list.length;
			},
			lenR() {
				return this.checkData.length;
			},
		},
		methods: {
			// changeCheck(id){
			// 	this.$emit('onchange', id);
			// },
			
			
			toLeft() {
				let removeArr = [];
				this.checkData.forEach((item, index) => {
					if (item.checked) {
						item.checked = false;
						this.$emit('onPerToLeft', item);
						removeArr.push(item.id);
					}
				});
				removeArr.forEach((item) => {
					this.checkData.forEach((itemData, index) => {
						if (item === itemData.id) {
							this.checkData.splice(index, 1);
							return;
						}
					});
				});
			},
			toRight() {
				let removeArr = [];
				let idx = -1;
				this.list.forEach((item) => {
					if (item.checked) {
						item.checked = false;
						// console.log(2222);
						// for (let i = 0; i < this.checkData.length; i++) {
						// 	console.log(1111);
						// 	if (item.id < this.checkData[i].id) {
						// 		console.log(item.id);
						// 		console.log(this.checkData[i].id);
						// 		idx = i;
						// 		return;
						// 	}
						// }
						// this.checkData.splice(idx, 0, item);
						this.checkData.push(item);
						removeArr.push(item.id);
					}
				});

				removeArr.forEach((item) => {
					this.list.forEach((itemData, index) => {
						if (item === itemData.id) {
							this.$emit('onPerToRight', index);
							return;
						}
					});
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.box {
		display: flex;
		align-items: center;

		.warp {
			width: 250px;
			height: 500px;
			border-radius: 10px;
			border: 1px solid #ccc;

			header {
				width: calc(100% - 40px);
				line-height: 50px;
				padding: 0 20px;
				background-color: #eee;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.rgt {
					color: #999;
				}
			}

			.dataItem {
				list-style: none;
				width: calc(100% - 40px);
				padding: 0 20px;

				li {
					line-height: 30px;
				}
			}

		}

		button {
			padding: 20px 30px;
			border: 0;
			outline: 0;
			background-color: #49deff;
			margin: 0 10px;
			color: white;
			border-radius: 10px;
			height: 60px;
			font-size: 20px;
		}

	}
</style>
