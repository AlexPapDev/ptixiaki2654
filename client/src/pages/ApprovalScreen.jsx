import { useEffect, useState, useRef, useCallback } from "react"
import axios from "axios"

const ApprovalScreen = () => {
  const [pendingMonuments, setPendingMonuments] = useState([])
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001"
  const token = localStorage.getItem("token")
  const hasFetched = useRef(false) // Prevents useEffect from running twice in Strict Mode

  // Fetch pending monuments
  const fetchPendingMonuments = useCallback(async () => {
    if (!token) return // Prevent API call if token is missing
    try {
      const result = await axios.get(`${API_BASE_URL}/api/monuments/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPendingMonuments(result.data.monuments || []) // Ensure state is updated correctly
    } catch (error) {
      console.error("Error fetching monuments:", error)
    }
  }, [API_BASE_URL, token])

  useEffect(() => {
    if (!hasFetched.current) {
      fetchPendingMonuments()
      hasFetched.current = true // Mark as fetched to prevent duplicate calls
    }
  }, [fetchPendingMonuments])

  // Approve a monument
  const approveMonument = async (monumentId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/api/monuments/${monumentId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status === 200) {
        setPendingMonuments((prev) => prev.filter((m) => m.monumentid !== monumentId))
      } else {
        console.error("Failed to approve monument")
      }
    } catch (error) {
      console.error("Error approving monument:", error)
    }
  }

  // Reject a monument
  const rejectMonument = async (monumentId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/api/monuments/${monumentId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status === 200) {
        setPendingMonuments((prev) => prev.filter((m) => m.monumentid !== monumentId))
      } else {
        console.error("Failed to reject monument")
      }
    } catch (error) {
      console.error("Error rejecting monument:", error)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pending Monument Approvals</h2>

      {pendingMonuments.length === 0 ? (
        <p style={styles.noData}>No monuments pending approval.</p>
      ) : (
        <div>
          {pendingMonuments.map((monument) => (
            <div key={monument.monumentid} style={styles.card}>
              
              <div style={styles.card}>
                <img src={monument.images[0] || ''} style={{width: '100px', height: '100px'}}></img>
                <div>
                  <h3 style={styles.monumentTitle}>{monument.name}</h3>
                  <p style={styles.text}><strong>Description:</strong> {monument.description}</p>
                  {/* <p style={styles.text}><strong>Address:</strong> {monument.address}</p> */}
                  <p style={styles.text}><strong>Submitted by User ID:</strong> {monument.created_by}</p>

                  <div style={styles.buttonContainer}>
                    <button 
                      style={{ ...styles.button, ...styles.approveButton }} 
                      onClick={() => approveMonument(monument.monumentid)}
                    >
                      Approve
                    </button>
                    <button 
                      style={{ ...styles.button, ...styles.rejectButton }} 
                      onClick={() => rejectMonument(monument.monumentid)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Inline Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  noData: {
    textAlign: "center",
    color: "#777",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",

    display: 'flex'
  },
  monumentTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  text: {
    fontSize: "14px",
    margin: "5px 0",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "3px",
    border: "none",
  },
  approveButton: {
    // backgroundColor: "#28a745",
    // color: "white",
  },
  rejectButton: {
    // backgroundColor: "#dc3545",
    // color: "white",
  },
}

export default ApprovalScreen
