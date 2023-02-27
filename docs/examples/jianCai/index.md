
# 一个简单的上传图片并且剪裁图片的功能
> 由于在`vite` 中用不了`Buffer`，一直没有解决，所以最后一步上传没有做
> 1. 利用 `input:file` 类型找到`files` ，然后通过 `new FileReader().readAsDataURL` jinxing读取，读取中有一个回调对象`e.target?.result` 赋值给 图片的`src` 属性
> 2. 使用 `canvas`  渲染 图片实例，这个是第一张图片
> 3. 使用 `canvas` 开始截图，截图面积是中间的小黄方块`100 * 100` ,通过`canvas`中的`putImageData` 方法 赋值图片,`toDataURL` 转化成`base64` 
> 4. **由于在`vitepress`中使用不了`getContext` ,效果显示不出来**

# 基础用法

<JianCai></JianCai>

<script setup>
  import JianCai from "../../../src/components/jianCaiUpload/index.vue" 
</script>

<details>

<summary>展开查看</summary>

```vue
  <template>
  <div>
    <div class="chooseArea">
      <input type="file" @change="changeInput" />
      <div>
        <img :src="chooseSrc" ref="imageRef" alt=""/>
      </div>
    </div>

    <div v-if="chooseSrc">
      <div 
        style="position: relative;" 
        @mousemove="handleMouseMove" 
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp">
        <canvas 
          width="300" 
          height="300" 
          style="border:2px dashed blue" ref="canvasRef">
        </canvas>
        <div class="center"></div>
      </div>

      <el-button-group>
        <el-button @click="ZoomOrShrink('zoom')">放大</el-button>
        <el-button @click="ZoomOrShrink('shrink')">缩小</el-button>
        <el-button @click="confirm" >确定</el-button>
      </el-button-group>
    </div>

    <div v-if="avatarSrc">
      <img :src="avatarSrc" ref="avatarRef" class="avatar" alt="">
      <el-button @click="upload" type="warning">上传</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue"
const chooseSrc = ref("")

const position = reactive({
  startX: 0,
  startY: 0,
  startDrag: false,

  lastLeft: 0,
  lastTop: 0
})

const times = ref(1)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const avatarRef = ref<HTMLImageElement | null>(null)
const avatarSrc = ref("")

const changeInput = (e) => {
  const Files = Array.from(e.target.files as FileList);
  let fileReader = new FileReader();//读取文件
  if (Files.length) {
    fileReader.readAsDataURL(Files[0]);
  }

  fileReader.onload = function (e) {
    chooseSrc.value = String(e.target?.result);
    if (imageRef.value) {
      imageRef.value.onload = () => draw()
    }
  }
}

function hasCanvasElement(val: HTMLCanvasElement | null | undefined): val is HTMLCanvasElement {
  return Boolean(val)
}

function hasImageElement(val: HTMLImageElement | null | undefined): val is HTMLImageElement {
  return Boolean(val)
}

const draw = (left = position.lastLeft, top = position.lastTop) => {

  const canvas = canvasRef.value;//canvas
  const image = imageRef.value;
  if (hasCanvasElement(canvas)) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hasImageElement(image)) {
      let imageWidth = image.width;//图片宽度
      let imageHeight = image.height;//图片高度

      if (imageWidth > imageHeight) {
        const ratio = canvas.width / imageWidth;
        // 放大 / 缩小
        imageWidth = canvas.width * times.value;//让宽度等于canvas宽度
        imageHeight = ratio * imageHeight * times.value;//然后让高度等比缩放
      } else {
        const ratio = canvas.height / imageHeight;
        imageHeight = canvas.height * times.value;
        imageWidth = ratio * imageWidth * times.value;
      }
      ctx.drawImage(image, (canvas.width - imageWidth) / 2 + left, (canvas.height - imageHeight) / 2 + top, imageWidth, imageHeight)
    }
  }
}

const ZoomOrShrink = (type: 'zoom' | 'shrink') => {
  if (type == "shrink") {
    times.value -= 0.1
  } else if (type == "zoom") {
    times.value += 0.1
  }
  draw()
}

const confirm = () => {
  const canvas = canvasRef.value;//canvas
  if (hasCanvasElement(canvas)) {
    const ctx = canvas.getContext("2d");
    const imageData = ctx!.getImageData(100, 100, 100, 100) as ImageData;//获取头像数据
    let clipCanvas = document.createElement('canvas');
    clipCanvas.width = 100;
    clipCanvas.height = 100;

    const clipContext = clipCanvas.getContext("2d") as CanvasRenderingContext2D;
    clipContext.putImageData(imageData, 0, 0);
    let dataUrl = clipCanvas.toDataURL();
    avatarSrc.value = dataUrl
  }
}

const upload = () => {

  const bytes = Buffer.from(avatarSrc.value.split(",")[1], "base64");
  const arrayBuffer = new ArrayBuffer(bytes.length);
  const blob = new Blob([arrayBuffer], { type: 'image/png' });
  console.log(blob)
}

// 刚开始按下
const handleMouseDown = (e: MouseEvent) => {
  position.startX = e.clientX;
  position.startY = e.clientY;
  position.startDrag = true;
}

const handleMouseMove = (e: MouseEvent) => {
  if (!position.startDrag) return;
  draw(e.clientX - position.startX + position.lastLeft, e.clientY - position.startY + position.lastTop)
}

const handleMouseUp = (e: MouseEvent) => {
  position.lastLeft = e.clientX - position.startX + position.lastLeft
  position.lastTop = e.clientY - position.startY + position.lastTop
  position.startDrag = false;
}

</script>
<style scoped lang="scss">
.center {
  width: 100px;
  height: 100px;
  background-color: yellow;
  opacity: .3;
  position: absolute;
  left: 100px;
  top: 100px
}

.avatar {
  border: 2px solid pink;
  width: 100px;
  height: 100px;
}
</style>
```
</details>
