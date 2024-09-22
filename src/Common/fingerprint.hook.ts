export function useFingerprint() {
  async function isAvailable(): Promise<string | any> {
    return new Promise((resolve, reject) => {
      if (!window.Fingerprint || typeof window.Fingerprint === 'undefined') {
        return reject(false)
      }

      window.Fingerprint.isAvailable(
        (result: any) => {
          return resolve(result)
        },
        (error: any) => {
          return reject(error)
        },
      )
    })
  }

  async function loadSecret(): Promise<string | any> {
    return new Promise((resolve, reject) => {
      if (!window.Fingerprint || typeof window.Fingerprint === 'undefined') {
        return reject(false)
      }

      const options = {
        title: 'Authentication',
        disableBackup: true, // always disabled on Android
      }

      window.Fingerprint.loadBiometricSecret(
        options,
        (secret: string) => {
          return resolve(secret)
        },
        (error: any) => {
          return reject(error)
        },
      )
    })
  }

  async function registerSecret(secret: string): Promise<boolean | any> {
    return new Promise((resolve, reject) => {
      const options = {
        secret,
        title: 'Device Registration',
        description: 'Authenticate',
        invalidateOnEnrollment: true,
        disableBackup: true,
      }

      if (!window.Fingerprint || typeof window.Fingerprint === 'undefined') {
        return reject(false)
      }

      window.Fingerprint.registerBiometricSecret(
        options,
        (result: string) => {
          if (result === 'biometric_success') {
            return resolve(true)
          }
        },
        (error: any) => {
          return reject(error)
        },
      )
    })
  }

  return {
    registerSecret,
    loadSecret,
    isAvailable,
  }
}
