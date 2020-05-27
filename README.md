# Architecture
```mermaid
graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[fa:fa-car Car]
```

```mermaid
graph TD
  A[Renderer]
  B[Physics]
  C[Collision]
```

# Design
Dedicated state manager?

-
-

# TODO
- Networking support, work on next to help guide design
- Multi-layer collision detection.
  - AABB first, then circle etc
- Add optional render for spatial hashmap
- Update engine to use percentages by default
    - Why? To support arbitrary resolution, easier debugging, intuitive coordinates
