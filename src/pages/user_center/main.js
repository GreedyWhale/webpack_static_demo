import './style.scss'
import { b } from '@/utils/index.js'

(function () {
  var p = document.createElement('p')
  p.textContent = 'fuck'
  p.classList.add('p')
  document.body.append(p)
  b()
})(window)
