import './style.scss'
import '@/assets/scss/common.scss'
import $ from 'jquery'
import { a } from '@/utils/index'
import '@/utils/a'

(function () {
  async function name () {
    await new Promise(resolve => {
      setTimeout(() => {
        console.log(1)
        resolve()
      }, 2000)
    })
    console.log(2)
  }
  name()
  console.log('foobar'.includes('4444'))
  var p = document.createElement('p')
  p.textContent = 'fuck'
  p.classList.add('p')
  document.body.append(p)
  $('body').css('background', 'pink')
  a()
})(window)
