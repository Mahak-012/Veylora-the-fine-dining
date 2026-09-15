export default function Footer() {
  return (
    <footer
      style={{
        background: '#0A0A0A',
        color: '#888',
        padding: '60px 24px 30px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Brand */}
          <div>
            <h3
              style={{
                color: '#C4956A',
                fontFamily: 'serif',
                fontSize: '24px',
                marginBottom: '15px',
              }}
            >
              Veylora
            </h3>

            <p
              style={{
                lineHeight: '1.7',
                fontSize: '14px',
              }}
            >
              Fine dining experience in the heart of the city.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
              }}
            >
              Hours
            </h4>

            <p
              style={{
                fontSize: '14px',
                lineHeight: '2',
              }}
            >
              Mon - Thu: 5PM - 11PM
            </p>

            <p
              style={{
                fontSize: '14px',
                lineHeight: '2',
              }}
            >
              Fri - Sun: 12PM - 12AM
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
              }}
            >
              Contact
            </h4>

            <p
              style={{
                fontSize: '14px',
                lineHeight: '2',
              }}
            >
              123 Main Street, Lahore
            </p>

            <p
              style={{
                fontSize: '14px',
                lineHeight: '2',
              }}
            >
              +92 300 1234567
            </p>

            <p
              style={{
                fontSize: '14px',
                lineHeight: '2',
              }}
            >
              hello@veylora.com
            </p>
          </div>

          {/* Follow */}
          <div>
            <h4
              style={{
                color: '#fff',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
              }}
            >
              Follow
            </h4>

            <div
              style={{
                display: 'flex',
                gap: '15px',
              }}
            >
              <a
                href="#"
                style={{
                  color: '#C4956A',
                  textDecoration: 'none',
                }}
              >
                Instagram
              </a>

              <a
                href="#"
                style={{
                  color: '#C4956A',
                  textDecoration: 'none',
                }}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: '30px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            fontSize: '13px',
          }}
        >
          <div>
            © 2026 Veylora. All rights reserved.
          </div>

          <div
            style={{
              color: '#C4956A',
              marginTop: '10px',
              fontSize: '13px',
            }}
          >
            Made with ❤️ by Mahak
          </div>
        </div>
      </div>
    </footer>
  )
}