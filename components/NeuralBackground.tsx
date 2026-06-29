'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  pulse: number
  pulseSpeed: number
}

interface Packet {
  fromIdx: number
  toIdx: number
  progress: number
  speed: number
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let nodes: Node[]   = []
    let packets: Packet[] = []
    let frameCount = 0

    const COLORS = ['#00d4ff', '#00d4ff', '#00d4ff', '#7c3aed', '#a855f7', '#e879f9']

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000))
      nodes = Array.from({ length: count }, () => ({
        x:          Math.random() * canvas.width,
        y:          Math.random() * canvas.height,
        vx:         (Math.random() - 0.5) * 0.4,
        vy:         (Math.random() - 0.5) * 0.4,
        size:       Math.random() * 1.5 + 0.5,
        color:      COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      }))
      packets = []
    }

    const spawnPacket = () => {
      const from = Math.floor(Math.random() * nodes.length)
      let   to   = Math.floor(Math.random() * nodes.length)
      if (to === from) to = (to + 1) % nodes.length
      packets.push({ fromIdx: from, toIdx: to, progress: 0, speed: 0.005 + Math.random() * 0.008 })
    }

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1,3), 16)
      const g = parseInt(hex.slice(3,5), 16)
      const b = parseInt(hex.slice(5,7), 16)
      return `${r},${g},${b}`
    }

    const draw = () => {
      frameCount++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn packets occasionally
      if (frameCount % 60 === 0 && packets.length < 15) spawnPacket()

      // Update nodes
      nodes.forEach(n => {
        n.pulse += n.pulseSpeed

        // Mouse repulsion
        const dx = n.x - mouseRef.current.x
        const dy = n.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.5
          n.vx += (dx / dist) * force
          n.vy += (dy / dist) * force
        }

        // Speed cap
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (speed > 1.2) { n.vx = (n.vx / speed) * 1.2; n.vy = (n.vy / speed) * 1.2 }

        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height)  n.vy *= -1
        n.x = Math.max(0, Math.min(canvas.width,  n.x))
        n.y = Math.max(0, Math.min(canvas.height, n.y))
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.12
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw data packets
      packets = packets.filter(p => {
        p.progress += p.speed
        if (p.progress >= 1) return false
        const from = nodes[p.fromIdx]
        const to   = nodes[p.toIdx]
        const dx   = to.x - from.x
        const dy   = to.y - from.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 200) return false

        const px = from.x + dx * p.progress
        const py = from.y + dy * p.progress

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = '#00d4ff'
        ctx.shadowBlur  = 8
        ctx.shadowColor = '#00d4ff'
        ctx.fill()
        ctx.shadowBlur = 0
        return true
      })

      // Draw nodes
      nodes.forEach(n => {
        const pulsedSize = n.size + Math.sin(n.pulse) * 0.5
        const rgb = hexToRgb(n.color)

        // Outer glow ring
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulsedSize * 6)
        grd.addColorStop(0,   `rgba(${rgb}, 0.3)`)
        grd.addColorStop(1,   `rgba(${rgb}, 0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, pulsedSize * 6, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, pulsedSize, 0, Math.PI * 2)
        ctx.fillStyle  = n.color
        ctx.shadowBlur  = 12
        ctx.shadowColor = n.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      raf = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    draw()
    window.addEventListener('resize',    resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize',    resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.65 }}
    />
  )
}
