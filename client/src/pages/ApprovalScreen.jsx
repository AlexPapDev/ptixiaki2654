import { useEffect, useState, useRef, useCallback } from "react"
import axios from "axios"
import useMonumentStore from '../stores/domain/MonumentStore'
import { toast } from 'react-toastify'

const ApprovalScreen = () => {
  const [monuments, setMonuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { getPendingMonuments, approveMonument, rejectMonument } = useMonumentStore()
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001"
  const token = localStorage.getItem("token")
  const hasFetched = useRef(false) // Prevents useEffect from running twice in Strict Mode

  useEffect(() => {
    fetchPendingMonuments()
  }, [])

  const fetchPendingMonuments = async () => {
    const result = await getPendingMonuments()
    if (result.success) {
      setMonuments(result.data)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const handleApprove = async (monumentId) => {
    const result = await approveMonument(monumentId)
    if (result.success) {
      setMonuments(monuments.filter(m => m._id !== monumentId))
      toast.success('Monument approved successfully')
    } else {
      toast.error(result.error)
    }
  }

  const handleReject = async (monumentId) => {
    const result = await rejectMonument(monumentId)
    if (result.success) {
      setMonuments(monuments.filter(m => m._id !== monumentId))
      toast.success('Monument rejected successfully')
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pending Monument Approvals</h2>

      {monuments.length === 0 ? (
        <p style={styles.noData}>No monuments pending approval.</p>
      ) : (
        <div>
          {monuments.map((monument) => (
            <div key={monument._id} style={styles.card}>
              
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
                      onClick={() => handleApprove(monument._id)}
                    >
                      Approve
                    </button>
                    <button 
                      style={{ ...styles.button, ...styles.rejectButton }} 
                      onClick={() => handleReject(monument._id)}
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
